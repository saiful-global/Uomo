import React from 'react'
import Image from '../Common/Image'
import { bannerData } from '../../api/bannerData'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FaFacebookF, FaInstagram, FaPinterest } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";

const Banner = () => {

    var settings = {
    dots: true,
    arrows:false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div>
        <ul className='flex gap-5 absolute bottom-14.5 left-48.75 ' style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className='w-1.5 h-1.5 bg-[#DDC2B9] rounded-full'></div>
    )
    };

  return (
    <>
    <section className='relative w-full overflow-hidden banner'>

      <div className='absolute -left-4 top-1/2 -translate-y-1/2 font-normal flex flex-col items-center gap-6  text-secondColor text-sm'>
          <FaFacebookF className='hover:text-blue-500' />
          <FaXTwitter />
          <FaInstagram className='hover:text-pink-600' />
          <FaPinterest className='hover:text-red-600' />
        <div className="-rotate-90 font-jost font-medium leading-6 mt-4.5">
          FOLLOW US 
        </div>
      </div>

      <div className='absolute -right-1 bottom-0 flex flex-col items-center gap-5'>
        <div className="-rotate-90 font-jost font-medium text-sm leading-6 text-primary-black">
          SCROLL
        </div>
        <div className="w-0.5 h-7.5 bg-primary-black"></div>
      </div>

      <div className="w-[95%] mx-auto">
        <Slider {...settings}>
            {bannerData?.map((item)=>(
                <Image className={"text-center w-full"} key={item.id} src={item.banner} />
            ))}
        </Slider>
      </div>
    </section>
    </>
  )
}

export default Banner