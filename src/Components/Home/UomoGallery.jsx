import React from 'react'
import Container from '../ui/Container'
import UomoGalleryImage from '../../assets/images/UomoGalleryImage.png'
import Image from '../common/Image'

const UomoGallery = () => {
  return (
    <>
    <section className='pb-12.25 md:pb-25.5'>
        <Container>
            {/* Side padding between 768px and 1470px so images do not touch the screen edges */}
            <div className='md:px-7.5 min-[1470px]:px-0'>
            <h2 className='text-center font-jost font-normal text-primary-black text-[26px] md:text-[35px] pb-8.5'>@UOMO</h2>
            <div className='grid-cols-3 md:grid-cols-6 grid gap-3.75 md:gap-1.5'>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
                <Image className="w-full h-auto" src={UomoGalleryImage}></Image>
            </div>
            </div>
        </Container>
    </section>
    </>
  )
}

export default UomoGallery
