import React, { useEffect, useState } from 'react'
import ShopBanner from '../Components/shop/ShopBanner'
import Breadcrumb from '../Components/common/Breadcrumb'
import Container from '../Components/ui/Container'
import AllProducts from '../Components/shop/AllProducts'
import SortAndView from '../Components/shop/SortAndView'
import axios from 'axios'
import {Helmet} from "react-helmet";

const Shop = () => {

  const [products,setProducts] = useState([]);
  const [view,setView] = useState(4);
  const [showAll, setShowAll] = useState(false);

  // for slice 
  let displayedProducts = showAll ? products : products.slice(0, 16);
  // for showProduct 
  let showingProducts = displayedProducts.length;

  // calculation of showProduct 
  let totalProduct = products.length;
  let showProduct = showingProducts;
  let result = Math.round((showProduct / totalProduct)*100);
  
  // API with Axios & then,catch
  function getProducts(){
      axios.get("https://dummyjson.com/products?page=1&limit=200")
      .then((res)=>{setProducts(res.data.products);})
      .catch((err)=>{throw new Error(err.message ? err.message : "Something went wrong!");})
  }
  useEffect(()=>{
      getProducts()
  },[])


  return (
    <main>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Uomo | Shop</title>
        </Helmet>
        <ShopBanner />
        <Container>
          <div className='flex justify-between pb-7.5 md:pb-10'>
            <Breadcrumb />
            <SortAndView setView={setView} />
          </div>
        </Container>
        <AllProducts items={displayedProducts} view={view} />

        {/* Range & Show More  */}

        {/* Range  */}
        <h3 className='text-center font-jost font-medium text-sm leading-6 text-black'>SHOWING {showProduct} of {totalProduct} Items</h3>
        <div className='w-75 h-1.5 bg-bg-footer mt-1.25 mb-4.25 rounded-[10px] mx-auto'>
          <div style={{width:`${result}%`}} className='w-[20%] h-full bg-primary-black rounded-[10px] duration-700'></div>
        </div>

        {/* show all button  */}
        <div className="text-center pb-12.5 md:pb-25">
            <button onClick={() => setShowAll(!showAll)} className="font-jost text-sm font-medium leading-6 text-primary-black relative after:content-[''] after:w-0 hover:after:w-[70%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300 cursor-pointer" >
                {showAll ? "SHOW LESS" : "SHOW MORE"}
            </button>
        </div>
    </main>
  )
}

export default Shop