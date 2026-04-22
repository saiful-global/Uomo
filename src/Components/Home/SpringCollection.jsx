import React from 'react'
import Container from '../ui/Container'
import { Link } from 'react-router'
import Image from '../Common/Image'
import springImage from "../../assets/images/springImage.png"
import Countdown from 'react-countdown';

// const renderer = ({ days, hours, minutes, seconds }) => {
//     return <span>{hours}:{minutes}:{seconds}</span>;
// };

const SpringCollection = () => {
  return (
    <>
    <section className='mx-15 bg-[#EBEBEB] '>
            <Container>
                <div className='flex gap-50.5'>
                    <div className='pt-52.25 pb-9'>
                        <div className='flex gap-5 items-center'>
                            <div className='ml-1.5 w-10 h-0.5 bg-[#C32929]'></div>
                            <p className='font-jost font-medium text-sm leading-6 text-[#C32929]'>DEAL OF THE WEEK</p>
                        </div>
                        <h2 className='uppercase font-jost font-bold text-[70px] text-primary-black'>Spring <span className='font-normal'>Collection</span></h2>
                        <Link className='font-jost text-primary-black text-sm font-medium leading-6 relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' to="/shop">SHOP NOW</Link>

                        {/* countdown */}
                          <Countdown
                                date={Date.now() + 510000000}
                                renderer={({ days, hours, minutes, seconds }) => {
                                    return (

                        <div className='pt-30'>
                            <div className='flex gap-6'>
                                <h3 className='mr-4 font-jost font-normal text-3xl leading-7.5 text-primary-black'>{days}</h3>
                                <p className='font-jost font-normal text-3xl leading-7.5 text-primary-black'>:</p>
                                <h3 className='mr-2 font-jost font-normal text-3xl leading-7.5 text-primary-black'>{hours}</h3>
                                <p className='font-jost font-normal text-3xl leading-7.5 text-primary-black'>:</p>
                                <h3 className='font-jost font-normal text-3xl leading-7.5 text-primary-black'>{minutes}</h3>
                                <p className='font-jost font-normal text-3xl leading-7.5 text-primary-black'>:</p>
                                <h3 className='font-jost font-normal text-3xl leading-7.5 text-primary-black'>{seconds}</h3>
                            </div>
                            <div className='flex gap-11'>
                                <p className='font-jost font-bold text-[16px] leading-7.5 text-secondColor'>DAYS</p>
                                <p className='font-jost font-bold text-[16px] leading-7.5 text-secondColor'>HOURS</p>
                                <p className='font-jost font-bold text-[16px] leading-7.5 text-secondColor'>MINS</p>
                                <p className='ml-1 font-jost font-bold text-[16px] leading-7.5 text-secondColor'>SEC</p>
                            </div>
                        </div>
                                    )

                                }}
                            />

                    </div>
                    <div className='pt-7 pb-7.25'>
                        <Image className="w-106.5 h-135.75" src={springImage}></Image>
                    </div>  
                </div>
            </Container>
    </section>
    </>
  )
}
export default SpringCollection