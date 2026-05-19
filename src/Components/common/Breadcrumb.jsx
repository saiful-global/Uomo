import React from 'react'
import Container from '../ui/Container'
import { Link, useLocation } from 'react-router'

const Breadcrumb = () => {

    let {pathname} = useLocation();
    let location = pathname.split("/").pop();
    

  return (
    <>
    <h2 className='font-jost font-medium text-sm leading-6 uppercase text-primary-black'><Link to="/">HOME</Link> / {location}</h2>
    </>
  )
}

export default Breadcrumb