import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const RootLayout = () => {
  return (
    <>
    <Header></Header>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default RootLayout