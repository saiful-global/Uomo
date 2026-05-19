import React from 'react'
import Container from '../ui/Container'
import UomoGalleryImage from '../../assets/images/UomoGalleryImage.png'
import Image from '../common/Image'

const UomoGallery = () => {
  return (
    <>
    <section className='pb-12.25 md:pb-25.5'>
        <Container>
            <h2 className='text-center font-jost font-normal text-primary-black text-[26px] md:text-[35px] pb-8.5'>@UOMO</h2>
            <div className='grid-cols-3 md:grid-cols-6 grid gap-3.75 md:gap-1.5'>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
                <Image src={UomoGalleryImage}></Image>
            </div>
        </Container>
    </section>
    </>
  )
}

export default UomoGallery