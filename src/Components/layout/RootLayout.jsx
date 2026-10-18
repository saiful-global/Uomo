import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import Header from './Header/Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import MobileNavigation from './Header/MobileNavigation'
import NewsLetter from '../common/NewsLetter'
import {Helmet} from "react-helmet";
import CookieConsent from '../common/CookieConsent'

const RootLayout = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Uomo</title>
    </Helmet>
    <Header></Header>
    <Outlet></Outlet>
    <ScrollRestoration />
    <MobileNavigation></MobileNavigation>
    <Footer></Footer>
    <ScrollToTop></ScrollToTop>
    <NewsLetter></NewsLetter>
    <CookieConsent></CookieConsent>
    </>
  )
}

export default RootLayout