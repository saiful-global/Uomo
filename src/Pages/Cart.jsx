import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import Container from '../Components/ui/Container'
import {
  getCartItems,
  removeFromCart,
  subscribeToCart,
  updateCartQuantity,
} from '../api/cartStore'

// Shipping options (cost in dollars)
const SHIPPING_OPTIONS = [
  { key: 'free', label: 'Free shipping', cost: 0 },
  { key: 'flat', label: 'Flat rate: $49', cost: 49 },
  { key: 'pickup', label: 'Local pickup: $8', cost: 8 },
]

// VAT is a simple percentage of the subtotal (no backend, so it is calculated here)
const VAT_RATE = 0.05

const STEPS = [
  { no: '01', title: 'Shopping Bag', text: 'Manage Your Items List' },
  { no: '02', title: 'Shipping and Checkout', text: 'Checkout Your Items List' },
  { no: '03', title: 'Confirmation', text: 'Review And Submit Your Order' },
]

const money = (value) => `$${Number(value).toFixed(2)}`

const RemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.31066 10.8107L10.8107 0.31066L11.6893 1.18934L1.18934 11.6893L0.31066 10.8107Z" fill="#777777" />
    <path d="M1.18934 0.31066L11.6893 10.8107L10.8107 11.6893L0.31066 1.18934L1.18934 0.31066Z" fill="#777777" />
  </svg>
)

const Cart = () => {
  const [items, setItems] = useState(() => getCartItems())
  const [shipping, setShipping] = useState('free')
  const [coupon, setCoupon] = useState('')

  // Keep the page in sync with the cart store (initial value is already loaded above)
  useEffect(() => {
    const syncCart = () => setItems(getCartItems())
    return subscribeToCart(syncCart)
  }, [])

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )

  const shippingCost = SHIPPING_OPTIONS.find((option) => option.key === shipping)?.cost ?? 0
  const vat = subtotal * VAT_RATE
  const total = subtotal + shippingCost + vat

  return (
    <main className="mt-15 md:mt-20 pb-15 md:pb-25">
      <Container>
        {/* Page title */}
        <h1 className="pt-8 md:pt-15 font-jost font-semibold text-3xl md:text-[40px] leading-tight uppercase text-primary-black">
          Cart
        </h1>

        {/* Steps */}
        <div className="mt-7.5 md:mt-13.5 grid grid-cols-1 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={step.no}
              className={`${index === 0 ? 'block' : 'hidden md:block'} border-b-2 pb-4.5 ${
                index === 0
                  ? 'border-primary-black text-primary-black'
                  : 'border-bg-footer text-secondColor'
              }`}
            >
              <h2 className="font-jost font-medium text-lg leading-7 uppercase">
                <span className="mr-2.5">{step.no}</span>
                {step.title}
              </h2>
              <p className="pl-8 font-jost font-normal text-sm leading-6 text-secondColor">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {items.length === 0 ? (
          /* Empty cart state */
          <div className="py-20 text-center">
            <p className="font-jost font-normal text-base text-secondColor">
              Your cart is empty.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block bg-primary-black px-10 py-4.5 font-jost font-medium text-sm uppercase text-primary-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 md:mt-15.5 flex flex-col lg:flex-row lg:gap-15">
            {/* Left column: items table */}
            <div className="w-full lg:w-232.5 lg:shrink-0">
              {/* Table head (desktop only) */}
              <div className="hidden md:grid grid-cols-[490fr_129fr_168fr_143fr] border-b border-bg-footer pb-4.5">
                <span className="font-jost font-medium text-sm leading-6 uppercase text-primary-black">Product</span>
                <span className="font-jost font-medium text-sm leading-6 uppercase text-primary-black">Price</span>
                <span className="font-jost font-medium text-sm leading-6 uppercase text-primary-black">Quantity</span>
                <span className="font-jost font-medium text-sm leading-6 uppercase text-primary-black">Subtotal</span>
              </div>

              {/* Table rows */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-bg-footer py-5 md:grid md:grid-cols-[490fr_129fr_168fr_143fr] md:gap-0 md:py-7.5"
                >
                  {/* Product image + name */}
                  <div className="flex items-center gap-4 md:gap-7.5">
                    <Link
                      to={`/shop/${item.id}`}
                      className="block h-20 w-20 shrink-0 overflow-hidden bg-[#eeeeee] md:h-30 md:w-30"
                    >
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        to={`/shop/${item.id}`}
                        className="block font-jost font-normal text-base leading-6 text-primary-black"
                      >
                        {item.name}
                      </Link>
                      {item.color ? (
                        <p className="font-jost font-normal text-sm leading-6 text-secondColor">
                          Color: <span className="ml-1">{item.color}</span>
                        </p>
                      ) : null}
                      {item.size ? (
                        <p className="font-jost font-normal text-sm leading-6 text-secondColor">
                          Size: <span className="ml-1">{item.size}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Price */}
                  <span className="hidden md:block font-jost font-normal text-base leading-6 text-secondColor">
                    {money(item.price)}
                  </span>

                  {/* Quantity */}
                  <div>
                    <div className="flex h-10 w-27.5 items-center justify-between border border-bg-footer px-4 md:h-12.5">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="font-jost text-sm text-secondColor"
                      >
                        -
                      </button>
                      <span className="font-jost font-normal text-sm text-secondColor">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="font-jost text-sm text-secondColor"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <span className="font-jost font-medium text-base leading-6 text-primary-black md:font-medium">
                    {money(item.price * item.quantity)}
                  </span>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="absolute right-0 top-5 md:top-1/2 md:-translate-y-1/2"
                  >
                    <RemoveIcon />
                  </button>
                </div>
              ))}

              {/* Coupon + update cart */}
              <div className="mt-7.5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex h-15 w-full items-center justify-between border border-bg-footer px-5 md:w-92.5">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon Code"
                    className="min-w-0 flex-1 bg-transparent font-jost font-normal text-sm leading-6 text-primary-black outline-none placeholder:text-secondColor"
                  />
                  <button
                    type="button"
                    className="font-jost font-medium text-sm uppercase text-primary-black"
                  >
                    Apply Coupon
                  </button>
                </div>
                <button
                  type="button"
                  className="h-15 w-full bg-bg-footer font-jost font-medium text-sm uppercase text-primary-black md:w-50"
                >
                  Update Cart
                </button>
              </div>
            </div>

            {/* Right column: cart totals */}
            <div className="mt-10 w-full lg:mt-0 lg:w-105 lg:shrink-0">
              <div className="border border-primary-black p-6 md:p-10">
                <h3 className="font-jost font-medium text-base leading-6 uppercase text-primary-black">
                  Cart Totals
                </h3>

                {/* Subtotal */}
                <div className="mt-6 grid grid-cols-[1fr_1fr] md:grid-cols-[199px_1fr] items-center border-b border-bg-footer pb-5">
                  <span className="font-jost font-medium text-sm uppercase text-primary-black">Subtotal</span>
                  <span className="font-jost font-medium text-sm text-primary-black">{money(subtotal)}</span>
                </div>

                {/* Shipping */}
                <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[199px_1fr] border-b border-bg-footer py-5">
                  <span className="font-jost font-medium text-sm uppercase text-primary-black">Shipping</span>
                  <div className="flex flex-col gap-3">
                    {SHIPPING_OPTIONS.map((option) => (
                      <label key={option.key} className="flex cursor-pointer items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shipping === option.key}
                          onChange={() => setShipping(option.key)}
                          className="h-4 w-4 shrink-0 cursor-pointer appearance-none border border-bg-footer checked:border-primary-black checked:bg-primary-black"
                        />
                        <span className="font-jost font-normal text-sm leading-6 text-primary-black">
                          {option.label}
                        </span>
                      </label>
                    ))}
                    <p className="font-jost font-normal text-sm leading-6 text-primary-black">
                      Shipping to AL.
                    </p>
                    <button
                      type="button"
                      className="relative w-fit font-jost font-medium text-sm uppercase text-primary-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-[60%] after:bg-primary-black after:content-[''] hover:after:w-full after:duration-300"
                    >
                      Change address
                    </button>
                  </div>
                </div>

                {/* VAT */}
                <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[199px_1fr] items-center border-b border-bg-footer py-5">
                  <span className="font-jost font-medium text-sm uppercase text-primary-black">VAT</span>
                  <span className="font-jost font-medium text-sm text-primary-black">{money(vat)}</span>
                </div>

                {/* Total */}
                <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[199px_1fr] items-center pt-5">
                  <span className="font-jost font-medium text-sm uppercase text-primary-black">Total</span>
                  <span className="font-jost font-medium text-sm text-primary-black">{money(total)}</span>
                </div>
              </div>

              {/* Checkout button (checkout page is not built yet) */}
              <button
                type="button"
                className="mt-5 h-15 w-full bg-primary-black font-jost font-medium text-sm uppercase text-primary-white transition hover:opacity-90"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}

export default Cart
