import React, { useEffect, useState } from 'react'
import Container from '../ui/Container'
import axios from 'axios';
import Product from '../Common/Product';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { TfiAngleRight } from "react-icons/tfi";
import { TfiAngleLeft } from "react-icons/tfi";

  // arrow
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`${className} absolute right-0 md:-right-6 top-1/2 translate-y-1/2 text-[25px]`} onClick={onClick}><TfiAngleRight /></div>
    );
  }

  // arrow
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`${className} absolute left-0 md:-left-6 top-1/2 translate-y-1/2 text-[25px]`} onClick={onClick}><TfiAngleLeft /></div>
    );
  }

    // responsive item control react-slick provlem
    const LimitedProduct = () => {
        const [products,setProducts] = useState([]);
        const [slidesToShow, setSlidesToShow] = useState(window.innerWidth < 768 ? 2 : 4);

    useEffect(() => {
      const handleResize = () => {
        setSlidesToShow(window.innerWidth < 768 ? 2 : 4);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);



    const settings = {
    dots: false,
    arrows:true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
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
    <section className='mt-9.25 md:mt-22.75 mb-12.5 md:mb-20.75'>
        <Container>
            <h2 className='text-center font-jost font-normal text-primary-black text-[26px] md:text-[35px]'>LIMITED <span className='font-bold'>EDITION</span></h2>
            <Slider {...settings} className='mt-3.25 md:mt-8.25'>
            {
              products?.map((item)=>(
                <Product key={item.id} item={item}></Product>
              ))
            }
            </Slider>
        </Container>
    </section>
    </>
  )
}

export default LimitedProduct