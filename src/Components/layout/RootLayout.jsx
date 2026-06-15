import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import MobileNavigation from './MobileNavigation'
import NewsLetter from '../common/NewsLetter'
import {Helmet} from "react-helmet";

const RootLayout = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Uomo</title>
    </Helmet>
    <Header></Header>
    <Outlet></Outlet>
    <MobileNavigation></MobileNavigation>
    <Footer></Footer>
    <ScrollToTop></ScrollToTop>
    <NewsLetter></NewsLetter>
    </>
  )
}

export default RootLayout