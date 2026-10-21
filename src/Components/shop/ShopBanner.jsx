import React from 'react'
import ShopImage from '../../assets/images/shop-banner.png'

// Tags shown under the title
const TAGS = ['#STAYHOME', 'NEW IN', 'JACKETS', 'HOODIES', 'MEN', 'WOMEN', 'TROUSERS', 'ACCESSORIES', 'SHOES']

const ShopBanner = () => {
  return (
    // Mobile: no image (as in mobile Figma), centered text only.
    // md and up: image with the text placed INSIDE it.
    <section className='mt-15 pt-8 pb-7.5 md:mt-20 md:pt-0 md:pb-9'>
      <div className='relative md:mx-15'>
        <img
          className='hidden md:block w-full h-auto min-h-52.5 lg:min-h-65 object-cover'
          src={ShopImage}
          alt='Shop banner'
        />

        {/* From md: overlay fills the image. Left padding keeps the text aligned with the page Container
            (image starts 60px from the edge, so container left = (100% - 1410px) / 2 inside the image). */}
        <div className='px-3.75 md:px-0 md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:pr-6 md:pl-[max(32px,calc((100%_-_1410px)/2))]'>
          <h2 className='font-jost font-bold uppercase leading-[1.1] wrap-break-word text-[30px] text-center text-primary-black md:text-start md:text-[clamp(44px,6.3vw,100px)] md:text-transparent md:[-webkit-text-stroke:2px_#222222] md:opacity-40'>
            Jackets &amp; Coats
          </h2>
          <ul className='flex flex-wrap justify-center md:justify-start List_Item mt-4 md:mt-3 lg:mt-4 gap-x-4 gap-y-1 md:gap-x-5 md:gap-y-2 lg:gap-x-7.75'>
            {TAGS.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ShopBanner
