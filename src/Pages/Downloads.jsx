import React from 'react'
import { Link } from 'react-router'
import AccountLayout from '../Components/account/AccountLayout'

// There are no downloadable products and no Figma design for this tab,
// so it only shows an empty state (like a shop without downloads).
const Downloads = () => {
  return (
    <AccountLayout title='DOWNLOADS'>
      <p className='font-jost font-normal text-sm leading-6 text-primary-black'>
        No downloads available yet.
      </p>
      <Link
        to='/shop'
        className='inline-flex items-center justify-center w-full sm:w-52 h-12.5 mt-6 bg-primary-black text-primary-white font-jost font-medium text-sm uppercase hover:bg-redColor duration-200'
      >
        Browse products
      </Link>
    </AccountLayout>
  )
}

export default Downloads
