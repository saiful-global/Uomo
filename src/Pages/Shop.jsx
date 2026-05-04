import React from 'react'
import ShopBanner from '../Components/Shop/ShopBanner'
import Breadcrumb from '../Components/Common/Breadcrumb'
import Container from '../Components/ui/Container'
import SortAndView from '../Components/Shop/SortAndView'

const Shop = () => {
  return (
    <main>
        <ShopBanner></ShopBanner>
        <Container>
          <div className='flex justify-between pb-10'>
            <Breadcrumb></Breadcrumb>
            <SortAndView></SortAndView>
          </div>
        </Container>
    </main>
  )
}

export default Shop