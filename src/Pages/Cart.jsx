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

// Desktop table columns (same grid for the head and every row so they line up)
const TABLE_GRID =
  'md:grid md:grid-cols-[minmax(0,490fr)_minmax(0,129fr)_minmax(0,168fr)_minmax(0,143fr)]'

// Cart totals row: label column + value column
const TOTALS_ROW = 'grid grid-cols-[110px_minmax(0,1fr)] 2xl:grid-cols-[199px_minmax(0,1fr)]'

const money = (value) => `$${Number(value).toFixed(2)}`

const RemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.31066 10.8107L10.8107 0.31066L11.6893 1.18934L1.18934 11.6893L0.31066 10.8107Z" fill="#777777" />
    <path d="M1.18934 0.31066L11.6893 10.8107L10.8107 11.6893L0.31066 1.18934L1.18934 0.31066Z" fill="#777777" />
  </svg>
)

// Quantity box with - and + buttons
const QuantityBox = ({ item }) => (
  <div className="flex h-10 w-25 items-center justify-between border border-bg-footer px-3.5 xl:h-12.5 2xl:w-27.5 2xl:px-4">
    <button
      type="button"
      onClick={() => updateCartQuantity(item.id, -1)}
      aria-label="Decrease quantity"
      className="px-1 font-jost text-sm text-secondColor"
    >
      -
    </button>
    <span className="font-jost font-normal text-sm text-secondColor">{item.quantity}</span>
    <button
      type="button"
      onClick={() => updateCartQuantity(item.id, 1)}
      aria-label="Increase quantity"
      className="px-1 font-jost text-sm text-secondColor"
    >
      +
    </button>
  </div>
)

// Color / size lines (only shown when the item has them)
const ItemMeta = ({ item }) => (
  <>
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
  </>
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
    <main className="mt-15 md:mt-20 pb-12 md:pb-20 xl:pb-25 overflow-x-hidden">
      <Container>
        {/* Extra side space between md and the max container width (Container has no padding from md) */}
        <div className="md:px-8 min-[1450px]:px-0">
          {/* Page title */}
          <h1 className="pt-6 md:pt-10 xl:pt-15 font-jost font-semibold text-3xl md:text-4xl xl:text-[40px] leading-tight uppercase text-primary-black">
            Cart
          </h1>

          {/* Steps (only step 01 on mobile) */}
          <div className="mt-6 md:mt-10 xl:mt-13.5 grid grid-cols-1 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.no}
                className={`${index === 0 ? 'block' : 'hidden md:block'} border-b-2 pb-3 md:pb-4.5 ${
                  index === 0
                    ? 'border-primary-black text-primary-black'
                    : 'border-bg-footer text-secondColor'
                }`}
              >
                <h2 className="font-jost font-medium text-base xl:text-lg leading-7 uppercase">
                  <span className="mr-2 xl:mr-2.5">{step.no}</span>
                  {step.title}
                </h2>
                <p className="pl-7 xl:pl-8 font-jost font-normal text-sm leading-6 text-secondColor">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {items.length === 0 ? (
            /* Empty cart state */
            <div className="py-16 md:py-20 text-center">
              <p className="font-jost font-normal text-base text-secondColor">
                Your cart is empty.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-block bg-primary-black px-8 py-4 font-jost font-medium text-sm uppercase text-primary-white"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="mt-8 md:mt-10 xl:mt-15.5 flex flex-col xl:flex-row xl:items-start xl:gap-10 2xl:gap-15">
              {/* Left column: items */}
              <div className="w-full min-w-0 xl:flex-1">
                {/* Table head (md and up) */}
                <div className={`hidden ${TABLE_GRID} border-b border-bg-footer pb-4.5`}>
                  <span className="font-jost font-medium text-sm leading-6 uppercase text-primary-black">Product</span>
                  <span className="font-jost font-medium text-sm leading-6 uppercase text-primary-black">Price</span>
                  <span className="font-jost font-medium text-sm leading-6 uppercase text-primary-black">Quantity</span>
                  <span className="font-jost font-medium text-sm leading-6 uppercase text-primary-black">Subtotal</span>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="border-b border-bg-footer">
                    {/* Mobile card (below md) */}
                    <div className="relative flex gap-4 py-5 md:hidden">
                      <Link
                        to={`/shop/${item.id}`}
                        className="block h-22.5 w-22.5 shrink-0 overflow-hidden bg-[#eeeeee]"
                      >
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </Link>

                      <div className="min-w-0 flex-1 pr-6">
                        <Link
                          to={`/shop/${item.id}`}
                          className="block break-words font-jost font-normal text-base leading-6 text-primary-black"
                        >
                          {item.name}
                        </Link>
                        <ItemMeta item={item} />
                        <p className="font-jost font-normal text-sm leading-6 text-secondColor">
                          {money(item.price)}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                          <QuantityBox item={item} />
                          <span className="font-jost font-medium text-base leading-6 text-primary-black">
                            {money(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="absolute right-0 top-5 p-1"
                      >
                        <RemoveIcon />
                      </button>
                    </div>

                    {/* Table row (md and up) */}
                    <div className={`hidden ${TABLE_GRID} items-center py-6 xl:py-7.5`}>
                      <div className="flex min-w-0 items-center gap-4 pr-4 xl:gap-7.5">
                        <Link
                          to={`/shop/${item.id}`}
                          className="block h-24 w-24 shrink-0 overflow-hidden bg-[#eeeeee] 2xl:h-30 2xl:w-30"
                        >
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </Link>
                        <div className="min-w-0">
                          <Link
                            to={`/shop/${item.id}`}
                            className="block break-words font-jost font-normal text-base leading-6 text-primary-black"
                          >
                            {item.name}
                          </Link>
                          <ItemMeta item={item} />
                        </div>
                      </div>

                      <span className="font-jost font-normal text-base leading-6 text-secondColor">
                        {money(item.price)}
                      </span>

                      <div>
                        <QuantityBox item={item} />
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="font-jost font-medium text-base leading-6 text-primary-black">
                          {money(item.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="shrink-0 p-1"
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon + update cart */}
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between xl:mt-7.5">
                  <div className="flex h-14 w-full items-center justify-between gap-3 border border-bg-footer px-4 sm:flex-1 sm:max-w-92.5 xl:h-15 xl:px-5">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon Code"
                      className="min-w-0 flex-1 bg-transparent font-jost font-normal text-sm leading-6 text-primary-black outline-none placeholder:text-secondColor"
                    />
                    <button
                      type="button"
                      className="shrink-0 whitespace-nowrap font-jost font-medium text-sm uppercase text-primary-black"
                    >
                      Apply Coupon
                    </button>
                  </div>
                  <button
                    type="button"
                    className="h-14 w-full bg-bg-footer font-jost font-medium text-sm uppercase text-primary-black sm:w-44 xl:h-15 2xl:w-50"
                  >
                    Update Cart
                  </button>
                </div>
              </div>

              {/* Right column: cart totals (below the list until xl) */}
              <div className="mt-10 w-full md:ml-auto md:max-w-105 xl:mt-0 xl:ml-0 xl:w-95 xl:max-w-none xl:shrink-0 2xl:w-105">
                <div className="border border-primary-black p-5 sm:p-6 xl:p-8 2xl:p-10">
                  <h3 className="font-jost font-medium text-base leading-6 uppercase text-primary-black">
                    Cart Totals
                  </h3>

                  {/* Subtotal */}
                  <div className={`${TOTALS_ROW} mt-5 items-center border-b border-bg-footer pb-5 xl:mt-6`}>
                    <span className="font-jost font-medium text-sm uppercase text-primary-black">Subtotal</span>
                    <span className="font-jost font-medium text-sm text-primary-black">{money(subtotal)}</span>
                  </div>

                  {/* Shipping */}
                  <div className={`${TOTALS_ROW} border-b border-bg-footer py-5`}>
                    <span className="font-jost font-medium text-sm uppercase text-primary-black">Shipping</span>
                    <div className="flex min-w-0 flex-col gap-3">
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
                  <div className={`${TOTALS_ROW} items-center border-b border-bg-footer py-5`}>
                    <span className="font-jost font-medium text-sm uppercase text-primary-black">VAT</span>
                    <span className="font-jost font-medium text-sm text-primary-black">{money(vat)}</span>
                  </div>

                  {/* Total */}
                  <div className={`${TOTALS_ROW} items-center pt-5`}>
                    <span className="font-jost font-medium text-sm uppercase text-primary-black">Total</span>
                    <span className="font-jost font-medium text-sm text-primary-black">{money(total)}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <Link
                  to="/checkout"
                  state={{ shipping }}
                  className="mt-5 flex h-14 w-full items-center justify-center bg-primary-black font-jost font-medium text-sm uppercase text-primary-white transition hover:opacity-90 xl:h-15"
                >
                  Proceed to checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}

export default Cart
