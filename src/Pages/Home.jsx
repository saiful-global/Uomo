import React from 'react'
import Banner from '../Components/Home/Banner'
import Category from '../Components/Home/category/Category'
import TrendyProducts from '../Components/Home/TrendyProducts'
import SpringCollection from '../Components/Home/SpringCollection'
import StartingCategory from '../Components/Home/StartingCategory'
import LimitedProduct from '../Components/Home/LimitedProduct'
import UomoGallery from '../Components/Home/UomoGallery'
import TrustBadges from '../Components/Home/TrustBadges'

const Home = () => {
  return(
    <>
    <Banner></Banner>
    <Category></Category>
    <TrendyProducts></TrendyProducts>
    <SpringCollection></SpringCollection>
    <StartingCategory></StartingCategory>
    {/* <LimitedProduct></LimitedProduct>
    <UomoGallery></UomoGallery>
    <TrustBadges></TrustBadges> */}
    </>
  ) 
}

export default Home