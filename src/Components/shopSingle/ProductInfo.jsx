import React, { useState } from 'react'
import { Link } from 'react-router'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'

// Right side of the single product page: breadcrumb, title, price,
// description, quantity, add to cart, wishlist/share and product meta.
// Props:
//   product        -> one product object from dummyjson
//   onAddToCart    -> optional, called with (product, quantity) (will be connected to the cart later)
//   onAddToWishlist-> optional, called with (product)
//
// NOTE: in ShopSingle use  <ProductInfo key={product.id} ... />
// The key resets the quantity back to 1 when the user moves to another product.
const ProductInfo = ({ product, onAddToCart = () => {}, onAddToWishlist = () => {} }) => {
  const [quantity, setQuantity] = useState(1)

  // Do not let the quantity go above the available stock (if dummyjson gives one)
  const max = product.stock > 0 ? product.stock : 99
  const decrease = () => setQuantity((q) => Math.max(1, q - 1))
  const increase = () => setQuantity((q) => Math.min(max, q + 1))

  // Native share sheet when the browser supports it (mostly phones); does nothing otherwise
  const handleShare = () => {
    navigator.share?.({ title: product.title, url: window.location.href }).catch(() => {})
  }

  const tags = product.tags?.join(', ')

  return (
    <div className='w-full'>

      {/* Breadcrumb + PREV / NEXT: desktop only (the mobile Figma frame does not have it) */}
      <div className='hidden md:flex justify-between items-center'>
        <h2 className='font-jost font-medium text-sm leading-6 uppercase text-primary-black'>
          <Link to='/'>HOME</Link> / <Link to='/shop'>THE SHOP</Link>
        </h2>
        <div className='flex items-center gap-7.5'>
          {/* "invisible" keeps the layout stable on the first product (id 1) where PREV does not exist */}
          <Link
            to={`/shop/${product.id - 1}`}
            className={`flex items-center gap-2.5 font-jost font-medium text-sm leading-6 uppercase text-primary-black ${product.id > 1 ? '' : 'invisible'}`}
          >
            <TfiAngleLeft className='text-[10px]' />
            PREV
          </Link>
          <Link
            to={`/shop/${product.id + 1}`}
            className='flex items-center gap-2.5 font-jost font-medium text-sm leading-6 uppercase text-primary-black'
          >
            NEXT
            <TfiAngleRight className='text-[10px]' />
          </Link>
        </div>
      </div>

      {/* Title */}
      <h1 className='mt-8 md:mt-11.25 font-jost font-normal text-xl leading-7 md:text-[26px] md:leading-8 text-primary-black'>
        {product.title}
      </h1>

      {/* Price */}
      <p className='mt-4 md:mt-2.5 font-jost font-medium text-[22px] leading-8 text-primary-black'>
        ${product.price}
      </p>

      {/* Description */}
      <p className='mt-6.5 font-jost font-normal text-sm leading-6 text-primary-black'>
        {product.description}
      </p>

      {/* Quantity + Add to cart */}
      <div className='mt-8 flex gap-5'>
        <div className='w-28.75 h-15 md:h-15.5 shrink-0 border-2 border-bg-footer flex items-center justify-between px-5 font-jost font-normal text-sm text-secondColor'>
          <button type='button' onClick={decrease} aria-label='Decrease quantity' className='cursor-pointer'>-</button>
          <span>{quantity}</span>
          <button type='button' onClick={increase} aria-label='Increase quantity' className='cursor-pointer'>+</button>
        </div>
        <button
          type='button'
          onClick={() => onAddToCart(product, quantity)}
          className='flex-1 md:flex-none md:w-70 h-15 md:h-15.5 bg-primary-black text-primary-white font-jost font-medium text-sm uppercase cursor-pointer'
        >
          ADD TO CART
        </button>
      </div>

      {/* Wishlist + Share.
          The short line under "ADD TO WISHLIST" is the ::after element (90px wide like Figma). */}
      <div className='mt-8.25 flex items-center gap-8'>
        <button
          type='button'
          onClick={() => onAddToWishlist(product)}
          className='relative flex items-center gap-2.5 h-6 font-jost font-medium text-[13px] uppercase text-primary-black cursor-pointer after:content-[""] after:absolute after:left-0 after:-bottom-1.25 after:h-0.5 after:w-22.5 after:bg-primary-black'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path d='M14.7145 2.64647C12.9744 0.906815 10.1436 0.906815 8.40393 2.64647L7.99986 3.0503L7.59603 2.64647C5.85637 0.906579 3.02531 0.906579 1.28565 2.64647C-0.418689 4.35081 -0.429756 7.05236 1.25998 8.93071C2.80114 10.6433 7.34643 14.3432 7.53928 14.4998C7.6702 14.6063 7.82773 14.6581 7.98432 14.6581C7.9895 14.6581 7.99468 14.6581 7.99963 14.6578C8.16163 14.6654 8.32481 14.6098 8.45997 14.4998C8.65282 14.3432 13.1986 10.6433 14.7402 8.93048C16.4297 7.05236 16.4186 4.35081 14.7145 2.64647ZM13.69 7.98554C12.4884 9.32042 9.18546 12.0735 7.99963 13.0505C6.8138 12.0738 3.51155 9.32089 2.31018 7.98577C1.13142 6.67561 1.12035 4.80974 2.28452 3.64557C2.87908 3.05125 3.6599 2.75385 4.44072 2.75385C5.22154 2.75385 6.00236 3.05101 6.59693 3.64557L7.48512 4.53377C7.59085 4.6395 7.72412 4.7026 7.86399 4.72474C8.09099 4.77348 8.33729 4.71014 8.51389 4.53401L9.40256 3.64557C10.5919 2.45668 12.5266 2.45692 13.7152 3.64557C14.8794 4.80974 14.8683 6.67561 13.69 7.98554Z' />
          </svg>
          ADD TO WISHLIST
        </button>

        <button
          type='button'
          onClick={handleShare}
          className='flex items-center gap-2 h-6 font-jost font-medium text-[13px] uppercase text-primary-black cursor-pointer'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.1' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='12' cy='3.5' r='2' />
            <circle cx='4' cy='8' r='2' />
            <circle cx='12' cy='12.5' r='2' />
            <path d='M5.8 7L10.2 4.5M5.8 9L10.2 11.5' />
          </svg>
          SHARE
        </button>
      </div>

      {/* Meta: SKU / Categories / Tags */}
      <div className='mt-10 font-jost font-normal text-[13px] leading-5.75'>
        <p>
          <span className='uppercase text-secondColor'>SKU:</span>{' '}
          <span className='text-primary-black'>{product.sku || 'N/A'}</span>
        </p>
        {product.category && (
          <p>
            <span className='uppercase text-secondColor'>Categories:</span>{' '}
            <span className='capitalize text-primary-black'>{product.category}</span>
          </p>
        )}
        {tags && (
          <p>
            <span className='uppercase text-secondColor'>Tags:</span>{' '}
            <span className='text-primary-black'>{tags}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
