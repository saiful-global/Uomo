import React from 'react'
import Container from '../ui/Container'
import UomoGalleryImage from '../../assets/images/UomoGalleryImage.png'
import Image from '../Common/Image'

const UomoGallery = () => {
  return (
    <>
    <section className='pb-25.5'>
        <Container>
            <h2 className='text-center font-jost font-normal text-primary-black text-[35px] pb-8.5'>@UOMO</h2>
            <div className='grid-cols-6 grid gap-1.5'>
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