import React, { useEffect, useState } from 'react'
import Container from '../ui/Container'
import Listitem from '../Common/Listitem'
import { Productcategory } from '../../api/productCategory'
import Product from '../Common/Product'
import axios from 'axios'

const TrendyProducts = () => {

    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState("all");
    const [showAll, setShowAll] = useState(false);
    const [filterProduct,setFilterProduct] = useState([]);

    let displayedProducts = showAll ? products : products.slice(0, 8);

    const handleActive =(name)=>{
        setCategory(name);
        if(name == 'all'){
            setFilterProduct(products);
        }
        else{
            let filterProduct = products.filter((item)=> item.category == name);
            setFilterProduct(filterProduct);
        }
    };

    // API with Axios & then,catch
    function getProducts(){
       axios.get("https://dummyjson.com/products")
       .then((res)=>{setProducts(res.data.products);setCategory("all");})
       .catch((err)=>{throw new Error(err.message ? err.message : "Something went wrong!");})
    }
    useEffect(()=>{
        getProducts()
    },[])
    

  return (
    <>
    <section className='mt-9.25 md:mt-25 mb-25'>
        <Container>
            {/* Headline */}
            <h2 className='text-center font-jost text-primary-black text-[26px] md:text-[35px] font-normal'>OUR TRENDY <span className='font-bold'>PRODUCTS</span></h2>

            {/* Trendy Products Lists */}
            <ul className='flex flex-wrap justify-center gap-x-11.25 gap-y-2 md:gap-13.5 mt-7.5'>
                {Productcategory?.map((item)=>(
                <Listitem onClick={()=>handleActive(item.name)} className={`${category == item.name ? "font-jost cursor-pointer text-primary-black text-sm md:text-base font-medium relative after:content-[''] after:w-[70%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300" : "font-jost cursor-pointer text-secondColor text-base font-medium" }`}>{item.name}</Listitem>
                ))}
            </ul>

            {/* products item map */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-x-7.5 gap-y-15 mt-10'>
                {category == "all" ? 
                displayedProducts.map((item) => (
                    <Product item={item} key={item.id} />
                )) : 
                filterProduct.map((item) => (
                    <Product item={item} key={item.id} />
                ))}
            </div>
            
            {/* show all button  */}
            <div className="text-center mt-10.5">
                <button onClick={() => setShowAll(!showAll)} className="font-jost text-sm font-medium leading-6 text-primary-black relative after:content-[''] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300 cursor-pointer" >
                    {showAll ? "SHOW LESS" : "SEE ALL PRODUCT"}
                </button>
            </div>
        </Container>
    </section>
    </>
  )
}

export default TrendyProducts