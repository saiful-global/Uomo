import React from 'react'
import { Link } from 'react-router'
import AccountLayout from '../Components/account/AccountLayout'

// There is no backend or login system, so the user name is a static demo value.
const USER_NAME = 'alitfn58'

const linkClass = 'underline hover:text-redColor duration-200'

const MyAccount = () => {
  return (
    <AccountLayout title='MY ACCOUNT'>
      <p className='font-jost font-normal text-sm leading-6 text-primary-black'>
        Hello <strong className='font-semibold'>{USER_NAME}</strong> (not{' '}
        <strong className='font-semibold'>{USER_NAME}</strong>?{' '}
        <Link to='/' className='hover:underline'>Log out</Link>)
      </p>

      <p className='font-jost font-normal text-sm leading-6 text-primary-black mt-6 max-w-176'>
        From your account dashboard you can view your{' '}
        <Link to='/my-account/orders' className={linkClass}>recent orders</Link>, manage your{' '}
        <Link to='/my-account/addresses' className={linkClass}>shipping and billing addresses</Link>, and{' '}
        <Link to='/my-account/account-details' className={linkClass}>edit your password and account details.</Link>
      </p>
    </AccountLayout>
  )
}

export default MyAccount
