import React, { useState } from 'react'
import Container from '../ui/Container'
import Listitem from '../Common/Listitem'
import { Productcategory } from '../../api/productCategory'

const TrendyProducts = () => {

    const [category,setCategory] = useState("all")

    const handleActive =()=>{
        alert("lsdfafsdhlkjh");
    }

  return (
    <>
    <section className='mt-25'>
        <Container>
            <h2 className='text-center font-jost text-primary-black text-[35px] font-normal'>OUR TRENDY <span className='font-bold'>PRODUCTS</span></h2>
            <ul className='flex justify-center gap-13.5'>
                {Productcategory?.map((item)=>(
                    <Listitem onCick={handleActive} className="font-jost cursor-pointer text-secondColor text-base font-medium relative after:content-[''] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300">{item.name}</Listitem>
                ))}
            </ul>
        </Container>
    </section>
    </>
  )
}

export default TrendyProducts