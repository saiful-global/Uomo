import React, { useEffect, useState } from 'react'
import Container from '../ui/Container'
import axios from 'axios';
import Product from '../common/Product';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { TfiAngleRight } from "react-icons/tfi";
import { TfiAngleLeft } from "react-icons/tfi";

  // arrow: round button with padding, easy to tap
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} z-10 absolute right-0 md:-right-6 top-[38%] -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-base md:text-lg text-primary-black cursor-pointer`} onClick={onClick}><TfiAngleRight /></div>
    );
  }

  // arrow: round button with padding, easy to tap
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} z-10 absolute left-0 md:-left-6 top-[38%] -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-base md:text-lg text-primary-black cursor-pointer`} onClick={onClick}><TfiAngleLeft /></div>
    );
  }

  // slides per screen: phones 2, tablets 3, laptops and up 4
  const getSlides = () => {
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  };

    // responsive item control react-slick provlem
    const LimitedProduct = () => {
        const [products,setProducts] = useState([]);
        const [slidesToShow, setSlidesToShow] = useState(getSlides());

    useEffect(() => {
      const handleResize = () => {
        setSlidesToShow(getSlides());
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);



    const settings = {
    dots: true,
    arrows:true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 600,
    speed: 800,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // dots under the slider (same style as the Banner, rules are in index.css)
    appendDots: dots => (
      <div>
        <ul className='mt-4 md:mt-6' style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    // the whole <li> area is clickable
    customPaging: () => (
      <div className='w-full h-full flex justify-center items-center cursor-pointer'>
        <span className='block w-1.5 h-1.5 bg-[#DDC2B9] rounded-full'></span>
      </div>
    )
    };

    // API call with React Hook 
    function getProducts(){
      axios.get("https://dummyjson.com/products")
      .then((res)=>{setProducts(res.data.products);})
      .catch((err)=>{throw new Error(err.message ? err.message : "Something went wrong!");})
    }
    useEffect(()=>{
        getProducts()
    },[])


  return (
    <>
    <section className='uomo-dots mt-9.25 md:mt-22.75 mb-12.5 md:mb-20.75 overflow-x-hidden'>
        <Container>
            {/* side padding keeps the arrows (-24px) inside the screen on tablets/laptops */}
            <div className='md:px-7.5 min-[1470px]:px-0'>
                <h2 className='text-center font-jost font-normal text-primary-black text-[26px] md:text-[35px]'>LIMITED <span className='font-bold'>EDITION</span></h2>
                <Slider {...settings} className='mt-3.25 md:mt-8.25'>
                {
                  // only the first 8 products, so the dots stay a reasonable number
                  products?.slice(0, 8).map((item)=>(
                    <Product key={item.id} item={item}></Product>
                  ))
                }
                </Slider>
            </div>
        </Container>
    </section>
    </>
  )
}

export default LimitedProduct
