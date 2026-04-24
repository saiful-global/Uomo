import React, { useEffect, useState } from 'react'
import Container from '../ui/Container'
import axios from 'axios';
import Product from '../Common/Product';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { TfiAngleRight } from "react-icons/tfi";
import { TfiAngleLeft } from "react-icons/tfi";

const LimitedProduct = () => {
    const [products,setProducts] = useState([]);

    // arrow
    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div className={`${className} absolute -right-6 top-1/2 translate-y-1/2 text-[25px]`} onClick={onClick}><TfiAngleRight /></div>
      );
    }

    // arrow
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div className={`${className} absolute -left-6 top-1/2 translate-y-1/2 text-[25px]`} onClick={onClick}><TfiAngleLeft /></div>
      );
    }

    const settings = {
    dots: false,
    arrows:true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
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
    <section className='mt-22.75 mb-20.75'>
        <Container>
            <h2 className='text-center font-jost font-normal text-primary-black text-[35px]'>LIMITED <span className='font-bold'>EDITION</span></h2>
            <Slider {...settings} className='mt-8.25'>
            {
              products?.map((item)=>(
                <Product item={item}></Product>
              ))
            }
            </Slider>
        </Container>
    </section>
    </>
  )
}

export default LimitedProduct