import React from 'react'
import Container from '../ui/Container'
import { Link } from 'react-router'
import Image from '../Common/Image'
import springImage from "../../assets/images/springImage.png"
import Countdown from 'react-countdown';


const SpringCollection = () => {
  return (
    <>
    <section className='mx-3.75 md:mx-15 bg-[#EBEBEB] '>
            <Container>
                <div className='flex md:gap-50.5 md:items-end'>
                    <div className='pb-6 md:pb-9 pt-18.5 ml-6 md:ml-0'>

                        {/* subHeading */}
                            <p className='font-jost font-medium text-sm leading-6 text-[#C32929] after:content-[] after:w-10 after:h-0.5 after:absolute after:-left-15 after:top-2 after:bg-[#c32929] relative ml-16.5'>DEAL OF THE WEEK</p>

                        {/* big heading */}
                        <h2 className='uppercase font-jost font-bold text-[30px] md:text-[70px] text-primary-black w-1/2 md:w-full'>Spring <span className='font-normal'>Collection</span></h2>

                        <Link className='font-jost text-primary-black text-sm font-medium leading-6 relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' to="/shop">SHOP NOW</Link>

                        {/* countdown */}
                        {/*Fixed timer for countdown = new Date("2026-12-17T00:00:00.000Z") <-- instead of --> Date.now() + 510000000 */}
                        <Countdown
                            date={Date.now() + 510000000}
                            renderer={({ days, hours, minutes, seconds }) => {
                                return (
                                        <div className='flex gap-4 md:gap-6 pt-6.25 md:pt-30'>
                                            <div>
                                                <h3 className='mr-4 font-jost font-normal text-[18px] md:text-3xl leading-7.5 text-primary-black'>{days}</h3>
                                                <p className='font-jost font-bold text-sm md:text-[16px] leading-7.5 text-secondColor'>DAYS</p>
                                            </div>
                                            <p className='font-jost font-normal text-3xl leading-7.5 text-primary-black'>:</p>
                                            <div>
                                                <h3 className='mr-2 font-jost font-normal text-[18px] md:text-3xl leading-7.5 text-primary-black'>{hours}</h3>
                                                <p className='font-jost font-bold text-sm md:text-[16px] leading-7.5 text-secondColor'>HOURS</p>
                                            </div>
                                            <p className='font-jost font-normal text-3xl leading-7.5 text-primary-black'>:</p>
                                            <div>
                                                <h3 className='font-jost font-normal text-[18px] md:text-3xl leading-7.5 text-primary-black'>{minutes}</h3>
                                                <p className='font-jost font-bold text-sm md:text-[16px] leading-7.5 text-secondColor'>MINS</p>
                                            </div>
                                            <p className='font-jost font-normal text-3xl leading-7.5 text-primary-black'>:</p>
                                            <div>
                                                <h3 className='font-jost font-normal text-[18px] md:text-3xl leading-7.5 text-primary-black'>{seconds}</h3>
                                                <p className='ml-1 font-jost font-bold text-sm md:text-[16px] leading-7.5 text-secondColor'>SEC</p>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                    </div>

                    {/* Image */}
                    <div className='pt-7 pb-7.25'>
                        <Image className="w-106.5 h-135.75 hidden md:block" src={springImage} alt="springCollectionImage"></Image>
                    </div>  
                </div>
            </Container>
    </section>
    </>
  )
}
export default SpringCollection