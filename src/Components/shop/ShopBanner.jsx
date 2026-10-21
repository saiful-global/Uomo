import React from 'react'
import ShopImage from '../../assets/images/shop-banner.png'
import Image from '../common/Image'
import Container from '../ui/Container'


const ShopBanner = () => {
  return (
    <section className='relative mt-30 md:mt-20'>
        <Image className="mx-auto w-full md:px-15 pb-7.5 md:pb-9" src={ShopImage} alt="ShopImage"></Image>

        {/* Overlay is anchored to the bottom of the section.
            Container has no side padding from md up, so the overlay adds it here (30px, none from 1470px = same as Header/Footer).
            Title and tags are in normal flow, so they can never overlap each other when the tags wrap. */}
        <div className='absolute inset-x-0 bottom-10 md:bottom-33.75 md:px-7.5 min-[1470px]:px-0'>
          <Container className="flex flex-col gap-7.5 md:gap-4">
            <h2 className='font-jost font-bold text-[30px] md:text-[64px] lg:text-[90px] uppercase text-center md:text-start text-primary-black md:text-transparent md:[-webkit-text-stroke:2px_#222222] md:opacity-40'>Jackets & Coats</h2>
            <ul className='flex flex-wrap justify-center md:justify-start List_Item gap-x-4 gap-y-1 md:gap-4 lg:gap-7.75'>
                <li>#STAYHOME</li>
                <li>NEW IN</li>
                <li>JACKETS</li>
                <li>HOODIES</li>
                <li>MEN</li>
                <li>WOMEN</li>
                <li>TROUSERS</li>
                <li>ACCESSORIES</li>
                <li>SHOES</li>
            </ul>
          </Container>
        </div>
    </section>
  )
}

export default ShopBanner
