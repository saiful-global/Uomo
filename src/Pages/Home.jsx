import React from 'react'
import Banner from '../Components/Home/Banner'
import Category from '../Components/Home/category/Category'
import TrendyProducts from '../Components/Home/TrendyProducts'
import SpringCollection from '../Components/Home/SpringCollection'

const Home = () => {
  return(
    <>
    <Banner></Banner>
    <Category></Category>
    <TrendyProducts></TrendyProducts>
    <SpringCollection></SpringCollection>
    </>
  ) 
}

export default Home