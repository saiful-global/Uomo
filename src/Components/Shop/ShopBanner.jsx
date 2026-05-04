import React from 'react'
import ShopImage from '../../assets/images/shop-banner.png'
import Image from '../Common/Image'
import Container from '../ui/Container'


const ShopBanner = () => {
  return (
    <>
    <section>
        <Image className="mx-auto w-full px-15 pb-9" src={ShopImage} alt="ShopImage"></Image>
        <Container className="relative">                                          
            <ul className='flex List_Item gap-7.75 w-full absolute bottom-33.75 left-0'>
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