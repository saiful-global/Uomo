import React from 'react'
import Container from '../ui/Container'
import Product from '../common/Product'

const AllProducts = ({items,view}) => {
  return (
    <section className='pb-12.5'>
        <Container>
            <div className={`grid ${view === 2? "grid-cols-2": view === 3? "grid-cols-3": "grid-cols-4"} gap-x-7.5 gap-y-15 justify-items-center`}>
                {items?.map((item)=>(
                <Product key={item.id} item={item} />
                ))}
            </div>
        </Container>
    </section>
  )
}

export default AllProducts