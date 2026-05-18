import React from 'react'
import Container from '../ui/Container'
import startingImage from '../../assets/images/startingImage.png'
import startingImage1 from '../../assets/images/startingImage1.png'
import Image from '../Common/Image'
import { Link } from 'react-router'

const StartingCategory = () => {
  return (
    <>
    <section className='mt-3.75 md:mt-25'>
        <Container>
            <div className='md:flex md:gap-7.5 overflow-x-hidden'>
                <div className='1/2 relative group w-full h-77.5 md:w-172.5 md:h-99.5 mb-3.75 md:mb-0'>
                    <Image src={startingImage1} className="absolute right-0 md:right-2.5 top-0"></Image>
                    <div className='w-full h-full duration-300 absolute top-0 left-0 bg-redColor md:bg-transparent group-hover:bg-redColor mix-blend-multiply'>
                        <div className='absolute bottom-7.5 md:bottom-12.5 left-7.5 md:left-12.5 w-full'>
                            <h3 className='group-hover:text-primary-white font-jost font-medium text-lg text-white md:text-primary-black'>STARTING AT $19</h3>
                            <h2 className='group-hover:text-primary-white font-jost font-medium text-[22px]  md:text-[26px] text-white md:text-primary-black'>Women’s T-Shirts</h2>
                            <Link className='group-hover:text-primary-white font-jost mt-2.75 md:mt-3.75 inline-block md:text-primary-black text-white text-sm font-medium leading-6 relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-white after:absolute after:bottom-0 after:left-0 after:duration-300' to="/">SHOP NOW</Link>
                        </div>
                    </div>
                </div>
                <div className='1/2 relative group w-full h-77.5 md:w-172.5 md:h-99.5'>
                    <Image src={startingImage} className="absolute inset-0 w-full h-full object-cover"></Image>
                    <div className='w-full h-full duration-300 absolute top-0 left-0 group-hover:bg-redColor mix-blend-multiply'>
                    </div>
                    <div className='absolute bottom-7.5 md:bottom-12.5 left-7.5 md:left-12.5 w-full'>
                        <h3 className='group-hover:text-primary-white font-jost font-medium text-lg text-primary-black'>STARTİNG AT $39</h3>
                        <h2 className='group-hover:text-primary-white font-jost font-medium text-[22px]  md:text-[26px] text-primary-black'>Men's Sportswear</h2>
                        <Link className='group-hover:text-primary-white font-jost mt-2.75 md:mt-3.75 inline-block text-primary-black text-sm font-medium leading-6 relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-white after:absolute after:bottom-0 after:left-0 after:duration-300' to="/">SHOP NOW</Link>
                    </div>
                </div>
            </div>
        </Container>
    </section>
    </>
  )
}

export default StartingCategory