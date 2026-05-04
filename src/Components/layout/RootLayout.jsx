import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const RootLayout = () => {
  return (
    <>
    <Header></Header>
    <Outlet></Outlet>
    <Footer></Footer>
    <ScrollToTop></ScrollToTop>
    </>
  )
}

export default RootLayout