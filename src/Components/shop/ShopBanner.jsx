import React from 'react'
import ShopImage from '../../assets/images/shop-banner.png'
import Image from '../common/Image'
import Container from '../ui/Container'


const ShopBanner = () => {
  return (
    <>
    <section className='mt-15 md:mt-0'>
        <Image className="mx-auto w-full md:px-15 pb-9" src={ShopImage} alt="ShopImage"></Image>
        <Container className="relative">     
          <h2 className='font-jost font-bold text-[30px] md:text-[90px] uppercase absolute bottom-30 md:bottom-43.75 left-[10%] md:left-0 text-transparent [-webkit-text-stroke:2px_#222222] opacity-40'>Jackets & Coats</h2>                                     
            <ul className='flex flex-wrap List_Item gap-4 md:gap-7.75 w-full absolute bottom-10 md:bottom-33.75 left-0 mx-3.75'>
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
    </section>
    </>
  )
}

export default ShopBanner