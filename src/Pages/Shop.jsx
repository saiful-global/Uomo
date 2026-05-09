import React, { useEffect, useState } from 'react'
import ShopBanner from '../Components/Shop/ShopBanner'
import Breadcrumb from '../Components/Common/Breadcrumb'
import Container from '../Components/ui/Container'
import SortAndView from '../Components/Shop/SortAndView'
import AllProducts from '../Components/shop/AllProducts'
import axios from 'axios'

const Shop = () => {

  const [products,setProducts] = useState([]);
  const [view,setView] = useState(4)

    // API with Axios & then,catch
  function getProducts(){
      axios.get("https://dummyjson.com/products?page=1&limit=50")
      .then((res)=>{setProducts(res.data.products);})
      .catch((err)=>{throw new Error(err.message ? err.message : "Something went wrong!");})
  }
  useEffect(()=>{
      getProducts()
  },[])

  return (
    <main>
        <ShopBanner />
        <Container>
          <div className='flex justify-between pb-10'>
            <Breadcrumb />
            <SortAndView setView={setView} />
          </div>
        </Container>
        <AllProducts items={products} view={view} />

        {/* Range & Show More  */}
        <div className='w-75 h-1.5 bg-[#E4E4E4] mt-1.25 mb-4.25 rounded-[10px] mx-auto'>
          <div className='w-[20%] h-full bg-primary-black rounded-[10px]'></div>
        </div>
    </main>
  )
}

export default Shop