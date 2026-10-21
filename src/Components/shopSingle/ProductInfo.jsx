import React, { useState } from 'react'
import { Link } from 'react-router'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import { addToCart, toggleWishlist, useWishlist } from '../../api/cartStore'

// Right side of the single product page: breadcrumb, title, price,
// description, quantity, add to cart, wishlist/share and product meta.
//
// Props:
//   product        -> one product object from dummyjson
//   onAddToCart    -> optional callback kept for compatibility
//   onAddToWishlist-> optional, called with (product)
const ProductInfo = ({ product, onAddToCart = () => {}, onAddToWishlist = () => {} }) => {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const wishlist = useWishlist()
  const isWishlisted = wishlist.some((w) => w.id === product.id)

  const max = product.stock > 0 ? product.stock : 99
  const decrease = () => setQuantity((q) => Math.max(1, q - 1))
  const increase = () => setQuantity((q) => Math.min(max, q + 1))

  const handleShare = () => {
    navigator.share?.({ title: product.title, url: window.location.href }).catch(() => {})
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    onAddToCart(product, quantity)
    setIsAdded(true)

    window.setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  const handleWishlist = () => {
    toggleWishlist(product)
    onAddToWishlist(product)
  }

  const tags = product.tags?.join(', ')

  return (
    <div className='w-full min-w-0'>
      {/* Breadcrumb + PREV/NEXT: hidden on phones (like Figma), wraps on narrow tablet columns */}
      <div className='hidden md:flex flex-wrap justify-between items-center gap-x-4 gap-y-2'>
        <h2 className='font-jost font-medium text-sm leading-6 uppercase text-primary-black'>
          <Link to='/'>HOME</Link> / <Link to='/shop'>THE SHOP</Link>
        </h2>
        <div className='flex items-center gap-4 lg:gap-7.5'>
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

      <h1 className='mt-8 md:mt-8 lg:mt-11.25 font-jost font-normal text-xl leading-7 md:text-2xl md:leading-8 lg:text-[26px] text-primary-black wrap-break-word'>
        {product.title}
      </h1>

      <p className='mt-4 md:mt-2.5 font-jost font-medium text-[22px] leading-8 text-primary-black'>
        ${product.price}
      </p>

      <p className='mt-6.5 font-jost font-normal text-sm leading-6 text-primary-black wrap-break-word'>
        {product.description}
      </p>

      {/* Quantity + Add to cart: button fills the row on phones, max 280px (Figma) on wider screens */}
      <div className='mt-8 flex gap-3 sm:gap-5'>
        <div className='w-28.75 h-15 md:h-15.5 shrink-0 border-2 border-bg-footer flex items-center justify-between px-2 font-jost font-normal text-sm text-secondColor'>
          <button type='button' onClick={decrease} aria-label='Decrease quantity' className='size-9 flex items-center justify-center cursor-pointer'>-</button>
          <span>{quantity}</span>
          <button type='button' onClick={increase} aria-label='Increase quantity' className='size-9 flex items-center justify-center cursor-pointer'>+</button>
        </div>

        <button
          type='button'
          onClick={handleAddToCart}
          className='flex-1 min-w-0 md:max-w-70 h-15 md:h-15.5 bg-primary-black text-primary-white font-jost font-medium text-sm uppercase cursor-pointer'
        >
          {isAdded ? 'ADDED' : 'ADD TO CART'}
        </button>
      </div>

      {/* Wishlist + Share: wraps to two lines on very narrow screens */}
      <div className='mt-8.25 flex flex-wrap items-center gap-x-8 gap-y-5'>
        <button
          type='button'
          onClick={handleWishlist}
          className='relative flex items-center gap-2.5 h-6 font-jost font-medium text-[13px] uppercase text-primary-black cursor-pointer after:content-[""] after:absolute after:left-0 after:-bottom-1.25 after:h-0.5 after:w-22.5 after:bg-primary-black'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill={isWishlisted ? '#D6001C' : 'currentColor'} xmlns='http://www.w3.org/2000/svg'>
            <path d='M14.7145 2.64647C12.9744 0.906815 10.1436 0.906815 8.40393 2.64647L7.99986 3.0503L7.59603 2.64647C5.85637 0.906579 3.02531 0.906579 1.28565 2.64647C-0.418689 4.35081 -0.429756 7.05236 1.25998 8.93071C2.80114 10.6433 7.34643 14.3432 7.53928 14.4998C7.6702 14.6063 7.82773 14.6581 7.98432 14.6581C7.9895 14.6581 7.99468 14.6581 7.99963 14.6578C8.16163 14.6654 8.32481 14.6098 8.45997 14.4998C8.65282 14.3432 13.1986 10.6433 14.7402 8.93048C16.4297 7.05236 16.4186 4.35081 14.7145 2.64647Z' />
          </svg>
          {isWishlisted ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
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

      <div className='mt-10 font-jost font-normal text-[13px] leading-5.75 wrap-break-word'>
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
