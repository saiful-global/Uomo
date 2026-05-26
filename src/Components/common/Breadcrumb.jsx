import React from 'react'
import Container from '../ui/Container'
import { Link, useLocation } from 'react-router'

const Breadcrumb = () => {

    let {pathname} = useLocation();
    let location = pathname.split("/").pop();
    

  return (
    <>
    <div className='hidden md:block'>
      <h2 className='font-jost font-medium text-sm leading-6 uppercase text-primary-black'><Link to="/">HOME</Link> / {location}</h2>
    </div>
    </>
  )
}

export default Breadcrumb