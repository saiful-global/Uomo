import React from 'react'
import ShopImage from '../../assets/images/shop-banner.png'
// Square image on the right side of the banner.
// Placeholder: uses an existing file so nothing breaks. Replace this one import with your real image.
import SideImage from '../../assets/images/bannerSideImage.jpg'

// Tags shown under the title
const TAGS = ['#STAYHOME', 'NEW IN', 'JACKETS', 'HOODIES', 'MEN', 'WOMEN', 'TROUSERS', 'ACCESSORIES', 'SHOES']

const ShopBanner = () => {
  return (
    // Mobile: no images (as in mobile Figma), centered text only.
    // md and up: background image with two columns inside it (text left, square image right).
    <section className='mt-15 pt-8 pb-7.5 md:mt-20 md:pt-0 md:pb-9'>
      <div className='relative md:mx-15'>
        {/* Background image: decides the banner height */}
        <img
          className='hidden md:block w-full h-auto min-h-52.5 lg:min-h-65 object-cover'
          src={ShopImage}
          alt='Shop banner'
        />

        {/* Overlay: always stays inside the background image.
            Left padding keeps the text aligned with the page Container,
            top/right/bottom padding keeps the side image away from the banner edges. */}
        <div className='px-3.75 md:px-0 md:absolute md:inset-0 md:flex md:items-stretch md:gap-6 lg:gap-10 md:py-2 lg:py-3 md:pr-2 lg:pr-3 md:pl-[max(32px,calc((100%_-_1410px)/2))]'>

          {/* Left column: title + tags.
              min-w-0 lets it shrink, so tags wrap to the next line instead of going under the image */}
          <div className='md:flex md:flex-col md:justify-center md:flex-1 md:min-w-0'>
            <h2 className='font-jost font-bold uppercase leading-[1.1] wrap-break-word text-[30px] text-center text-primary-black md:text-start md:text-[clamp(40px,5.6vw,96px)] md:text-transparent md:[-webkit-text-stroke:2px_#222222] md:opacity-40'>
              Jackets &amp; Coats
            </h2>
            <ul className='flex flex-wrap justify-center md:justify-start List_Item mt-4 md:mt-3 lg:mt-4 gap-x-4 gap-y-1 md:gap-x-5 md:gap-y-2 lg:gap-x-7.75'>
              {TAGS.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>

          {/* Right column: square image, full height of the padded area, never wider than 30% */}
          <img
            className='hidden md:block shrink-0 h-full aspect-square max-w-[40%] object-cover'
            src={SideImage}
            alt='Jackets and coats'
          />
        </div>
      </div>
    </section>
  )
}

export default ShopBanner
