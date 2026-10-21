import React from 'react'
import { Link } from 'react-router'
import AccountLayout from '../Components/account/AccountLayout'
import { removeFromWishlist, useWishlist } from '../api/cartStore'

const HEART_PATH =
  'M14.7145 2.64647C12.9744 0.906815 10.1436 0.906815 8.40393 2.64647L7.99986 3.0503L7.59603 2.64647C5.85637 0.906579 3.02531 0.906579 1.28565 2.64647C-0.418689 4.35081 -0.429756 7.05236 1.25998 8.93071C2.80114 10.6433 7.34643 14.3432 7.53928 14.4998C7.6702 14.6063 7.82773 14.6581 7.98432 14.6581C7.9895 14.6581 7.99468 14.6581 7.99963 14.6578C8.16163 14.6654 8.32481 14.6098 8.45997 14.4998C8.65282 14.3432 13.1986 10.6433 14.7402 8.93048C16.4297 7.05236 16.4186 4.35081 14.7145 2.64647Z'

const Wishlist = () => {
  // Live list from localStorage (updates when a heart is clicked anywhere on the site)
  const items = useWishlist()

  return (
    <AccountLayout title='WISHLIST'>
      {items.length === 0 ? (
        <div>
          <p className='font-jost font-normal text-sm leading-6 text-primary-black'>
            Your wishlist is empty.
          </p>
          <Link
            to='/shop'
            className='inline-flex items-center justify-center w-full sm:w-52 h-12.5 mt-6 bg-primary-black text-primary-white font-jost font-medium text-sm uppercase hover:bg-redColor duration-200'
          >
            Browse products
          </Link>
        </div>
      ) : (
        <ul className='grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-x-7.5 gap-y-10'>
          {items.map((item) => (
            <li key={item.id} className='min-w-0'>
              {/* Image + remove (X) button */}
              <div className='relative aspect-33/40 bg-bg-footer'>
                <Link to={`/shop/${item.id}`} className='block w-full h-full'>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading='lazy'
                      className='w-full h-full object-contain'
                    />
                  )}
                </Link>
                <button
                  type='button'
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label='Remove from wishlist'
                  className='absolute top-5 left-5 w-10 h-10 bg-primary-white flex items-center justify-center cursor-pointer hover:text-redColor duration-200'
                >
                  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M1 1L13 13M13 1L1 13' />
                  </svg>
                </button>
              </div>

              {/* Category, name, price + filled heart (click = remove) */}
              <div className='mt-4 flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='font-jost font-normal text-sm leading-6 text-secondColor capitalize'>
                    {item.category}
                  </p>
                  <Link to={`/shop/${item.id}`} className='block'>
                    <h2 className='font-jost font-normal text-sm md:text-base leading-6 text-primary-black truncate'>
                      {item.name}
                    </h2>
                  </Link>
                  <p className='font-jost font-normal text-sm md:text-base leading-6 text-primary-black'>
                    ${item.price}
                  </p>
                </div>
                <button
                  type='button'
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label='Remove from wishlist'
                  className='shrink-0 mt-1.5 cursor-pointer'
                >
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='#D6001C' xmlns='http://www.w3.org/2000/svg'>
                    <path d={HEART_PATH} />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AccountLayout>
  )
}

export default Wishlist
