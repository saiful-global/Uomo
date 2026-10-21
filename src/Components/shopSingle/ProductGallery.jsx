import React, { useEffect, useState } from 'react'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import Image from '../common/Image'

// Gallery for the single product page.
// Props:
//   images -> array of image urls (dummyjson: product.images)
//   title  -> product title, used for alt text
//
// NOTE: this component expects to be placed inside <Container>.
// Below md the main image is full width (edge to edge) like Figma, so it uses
// -mx-3.75 to cancel the 15px side padding that Container adds on small screens.
const ProductGallery = ({ images = [], title = '' }) => {
  const [active, setActive] = useState(0)
  const [isFull, setIsFull] = useState(false)

  // Figma shows 4 thumbnails, so only the first 4 images are used
  const list = images.slice(0, 4)
  const total = list.length

  // When the page switches to another product, the old index may not exist anymore.
  // This keeps the index safe without needing an extra effect.
  const current = active < total ? active : 0

  // Full screen mode: close with the Escape key and stop the page behind from scrolling
  useEffect(() => {
    if (!isFull) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIsFull(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isFull])

  if (total === 0) return null

  // Wrap around: after the last image comes the first one, and the other way round
  const prev = () => setActive((current - 1 + total) % total)
  const next = () => setActive((current + 1) % total)

  return (
    <div className='flex flex-col md:flex-row md:gap-2.5 w-full min-w-0'>

      {/* Thumbnails: row of 4 under the image below md, vertical column on the left from md.
          Column is 60px wide on tablets and 90px from lg, so 4 thumbnails never get taller than the main image. */}
      <div className='order-2 md:order-1 mt-2.5 md:mt-0 grid grid-cols-4 gap-2 md:flex md:flex-col md:gap-2.5 md:w-15 lg:w-22.5 md:shrink-0 md:self-start'>
        {list.map((src, i) => (
          <button
            key={i}
            type='button'
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            className={`aspect-square md:size-15 lg:size-22.5 overflow-hidden cursor-pointer ${i === current ? 'bg-[#E6E6E6]' : 'bg-[#F5F5F5]'}`}
          >
            <Image src={src} alt={`${title} ${i + 1}`} className='size-full object-cover' />
          </button>
        ))}
      </div>

      {/* Main image.
          Normal mode: 450px high on phones (taller on wide phones/small tablets), ratio 710:700 from md (same as Figma).
          Full screen mode: the same box becomes a fixed overlay above the header. */}
      <div
        className={`order-1 md:order-2 ${
          isFull
            ? 'fixed inset-0 z-60 bg-white'
            : 'relative flex-1 min-w-0 h-112.5 sm:h-125 md:h-auto md:aspect-[710/700] -mx-3.75 md:mx-0 bg-[#E7E7E7]'
        }`}
      >
        {/* Plain <img> on purpose: this is the biggest image above the fold,
            so it loads immediately instead of lazy loading. */}
        <img
          src={list[current]}
          alt={title}
          loading='eager'
          fetchPriority='high'
          className={`size-full ${isFull ? 'object-contain' : 'object-cover'}`}
        />

        {/* Prev / Next arrows (hidden when there is only one image) */}
        {total > 1 && (
          <>
            <button
              type='button'
              onClick={prev}
              aria-label='Previous image'
              className='absolute top-1/2 -translate-y-1/2 left-2.5 md:left-4 lg:left-7.5 size-9 md:size-10 lg:size-11 rounded-full bg-white flex items-center justify-center text-secondColor cursor-pointer'
            >
              <TfiAngleLeft className='text-[10px] lg:text-xs' />
            </button>
            <button
              type='button'
              onClick={next}
              aria-label='Next image'
              className='absolute top-1/2 -translate-y-1/2 right-2.5 md:right-4 lg:right-7.5 size-9 md:size-10 lg:size-11 rounded-full bg-white flex items-center justify-center text-secondColor cursor-pointer'
            >
              <TfiAngleRight className='text-[10px] lg:text-xs' />
            </button>
          </>
        )}

        {/* Expand / close full screen button */}
        <button
          type='button'
          onClick={() => setIsFull(!isFull)}
          aria-label={isFull ? 'Close full screen' : 'Open full screen'}
          className='absolute right-3.75 bottom-4 md:right-4 md:bottom-4 lg:right-7.5 lg:bottom-8 size-9 md:size-10 lg:size-11 rounded-full bg-white shadow-[0_2px_8px_rgba(34,34,34,0.1)] flex items-center justify-center text-primary-black cursor-pointer'
        >
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M1 5V1h4M1 1l4.5 4.5M13 5V1H9M13 1L8.5 5.5M1 9v4h4M1 13l4.5-4.5M13 9v4H9M13 13L8.5 8.5' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProductGallery
