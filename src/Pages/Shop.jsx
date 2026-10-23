import React, { useEffect, useState } from 'react'
import ShopBanner from '../Components/shop/ShopBanner'
import Breadcrumb from '../Components/common/Breadcrumb'
import Container from '../Components/ui/Container'
import AllProducts from '../Components/shop/AllProducts'
import SortAndView from '../Components/shop/SortAndView'
import axios from 'axios'
import {Helmet} from "react-helmet";

// first batch size and the step added on every SHOW MORE click
const INITIAL_COUNT = 16;
const STEP = 8;

const Shop = () => {

  const [products,setProducts] = useState([]);
  const [view,setView] = useState(4);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // for slice 
  let displayedProducts = products.slice(0, visibleCount);
  // for showProduct 
  let showingProducts = displayedProducts.length;

  // calculation of showProduct 
  let totalProduct = products.length;
  let showProduct = showingProducts;
  let result = Math.round((showProduct / totalProduct)*100);

  // SHOW MORE stays while hidden products remain; SHOW LESS appears only after more than 16 are shown
  const hasMore = visibleCount < totalProduct;
  const canShowLess = visibleCount > INITIAL_COUNT;
  
  // API with Axios & then,catch
  function getProducts(){
      axios.get("https://dummyjson.com/products?page=1&limit=200")
      .then((res)=>{setProducts(res.data.products);})
      .catch((err)=>{throw new Error(err.message ? err.message : "Something went wrong!");})
  }
  useEffect(()=>{
      getProducts()
  },[])

  const buttonClass = "font-jost text-sm font-medium leading-6 text-primary-black relative after:content-[''] after:w-0 hover:after:w-[70%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300 cursor-pointer";

  return (
    <main>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Uomo | Shop</title>
        </Helmet>
        <ShopBanner />
        {/* Container has no side padding from md up, so this wrapper adds it (same as Header/Footer) */}
        <div className='md:px-7.5 min-[1470px]:px-0'>
          <Container>
            <div className='flex items-center justify-between gap-4 pb-7.5 md:pb-10'>
              {/* Breadcrumb is not in the mobile Figma */}
              <div className='hidden md:block'><Breadcrumb /></div>
              <SortAndView setView={setView} />
            </div>
          </Container>
        </div>
        <AllProducts items={displayedProducts} view={view} />

        {/* Range & Show More  */}

        {/* Range  */}
        <h3 className='text-center font-jost font-medium text-sm leading-6 text-black'>SHOWING {showProduct} of {totalProduct} Items</h3>
        <div className='w-[90%] max-w-75 h-1.5 bg-bg-footer mt-1.25 mb-4.25 rounded-[10px] mx-auto'>
          <div style={{width:`${result}%`}} className='w-[20%] h-full bg-primary-black rounded-[10px] duration-700'></div>
        </div>

        {/* show more / show less buttons (separate buttons, SHOW LESS sits below SHOW MORE) */}
        <div className="flex flex-col items-center gap-3 pb-12.5 md:pb-25">
            {hasMore && (
              <button onClick={() => setVisibleCount((count) => Math.min(count + STEP, totalProduct))} className={buttonClass}>
                  SHOW MORE
              </button>
            )}
            {canShowLess && (
              <button onClick={() => setVisibleCount(INITIAL_COUNT)} className={buttonClass}>
                  SHOW LESS
              </button>
            )}
        </div>
    </main>
  )
}

export default Shop
