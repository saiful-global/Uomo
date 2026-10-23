import React from 'react'
import Container from '../ui/Container'
import startingImage from '../../assets/images/startingImage.png'
import startingImage1 from '../../assets/images/startingImage1.png'
import Image from '../common/Image'
import { Link } from 'react-router'

const StartingCategory = () => {
  return (
    <>
    <section className='mt-3.75 md:mt-25'>
        <Container>
            {/* Side padding between 768px and 1470px so cards do not touch the screen edges */}
            <div className='md:px-7.5 min-[1470px]:px-0'>
            <div className='md:flex md:gap-7.5 overflow-x-hidden'>
                {/* overflow-hidden clips the zoomed image and the sliding red layer inside the card */}
                <div className='relative group overflow-hidden w-full h-77.5 md:w-auto md:flex-1 md:min-w-0 md:h-72 lg:h-85 xl:h-99.5 mb-3.75 md:mb-0'>
                    <Image src={startingImage1} className="absolute right-0 md:right-2.5 top-0 h-full w-full md:w-[calc(100%-10px)] object-cover object-right transition-transform duration-700 group-hover:scale-105"></Image>
                    <div className='w-full h-full absolute top-0 left-0 bg-redColor md:bg-transparent mix-blend-multiply'>
                        {/* Red layer: slides in from the left on hover, slides back out on mouse leave */}
                        <div className='absolute inset-0 bg-redColor -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out'></div>
                        <div className='absolute bottom-7.5 md:bottom-8 lg:bottom-12.5 left-7.5 md:left-8 lg:left-12.5 right-3.75'>
                            <h3 className='group-hover:text-primary-white transition-colors duration-300 font-jost font-medium text-lg text-white md:text-primary-black'>STARTING AT $19</h3>
                            <h2 className='group-hover:text-primary-white transition-colors duration-300 font-jost font-medium text-[22px]  md:text-[26px] text-white md:text-primary-black'>Women’s T-Shirts</h2>
                            <Link className='group-hover:text-primary-white transition-colors duration-300 font-jost mt-2.75 md:mt-3.75 inline-block md:text-primary-black text-white text-sm font-medium leading-6 relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-white after:absolute after:bottom-0 after:left-0 after:duration-300' to="/shop">SHOP NOW</Link>
                        </div>
                    </div>
                </div>
                {/* overflow-hidden clips the zoomed image and the sliding red layer inside the card */}
                <div className='relative group overflow-hidden w-full h-77.5 md:w-auto md:flex-1 md:min-w-0 md:h-72 lg:h-85 xl:h-99.5'>
                    <Image src={startingImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"></Image>
                    {/* Red layer: slides in from the left on hover, slides back out on mouse leave */}
                    <div className='w-full h-full absolute top-0 left-0 bg-redColor -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out mix-blend-multiply'>
                    </div>
                    <div className='absolute bottom-7.5 md:bottom-8 lg:bottom-12.5 left-7.5 md:left-8 lg:left-12.5 right-3.75'>
                        {/* Mobile only: w-fit shrinks the box to the exact text width, so the blur covers only these two lines; from md up the blur and white tint are removed */}
                        <div className='w-fit backdrop-blur-md bg-white/30 md:backdrop-blur-none md:bg-transparent'>
                            <h3 className='group-hover:text-primary-white transition-colors duration-300 font-jost font-medium text-lg text-primary-black'>STARTING AT $39</h3>
                            <h2 className='group-hover:text-primary-white transition-colors duration-300 font-jost font-medium text-[22px]  md:text-[26px] text-primary-black'>Men's Sportswear</h2>
                        </div>
                        <Link className='group-hover:text-primary-white transition-colors duration-300 font-jost mt-2.75 md:mt-3.75 inline-block text-primary-black text-sm font-medium leading-6 relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-white after:absolute after:bottom-0 after:left-0 after:duration-300' to="/shop">SHOP NOW</Link>
                    </div>
                </div>
            </div>
            </div>
        </Container>
    </section>
    </>
  )
}

export default StartingCategory
