import React from 'react'
import Container from '../ui/Container'
import Product from '../common/Product'

const AllProducts = ({items,view}) => {
  return (
    <section className='pb-12.5'>
        {/* Container has no side padding from md up, so this wrapper adds it (same as Header/Footer) */}
        <div className='md:px-7.5 min-[1470px]:px-0'>
        <Container>
            <div className={`grid ${view === 2? "grid-cols-2": view === 3? "grid-cols-2 md:grid-cols-3": "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-x-3.5 md:gap-x-7.5 gap-y-3.75 md:gap-y-15 justify-items-center`}>
                {items?.map((item)=>(
                <Product key={item.id} item={item} />
                ))}
            </div>
        </Container>
        </div>
    </section>
  )
}

export default AllProducts