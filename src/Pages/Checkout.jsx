import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router'
import Container from '../Components/ui/Container'
import { getCartItems, subscribeToCart } from '../api/cartStore'

// Same shipping options and VAT rate as the Cart page
const SHIPPING_OPTIONS = {
  free: { label: 'Free shipping', cost: 0 },
  flat: { label: 'Flat rate: $49', cost: 49 },
  pickup: { label: 'Local pickup: $8', cost: 8 },
}
const VAT_RATE = 0.05

const STEPS = [
  { no: '01', title: 'Shopping Bag', text: 'Manage Your Items List' },
  { no: '02', title: 'Shipping and Checkout', text: 'Checkout Your Items List' },
  { no: '03', title: 'Confirmation', text: 'Review And Submit Your Order' },
]

const COUNTRIES = [
  'Australia',
  'Bangladesh',
  'Canada',
  'France',
  'Germany',
  'India',
  'Pakistan',
  'Turkey',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
]

const PAYMENT_METHODS = [
  {
    key: 'bank',
    label: 'Direct bank transfer',
    text: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
  },
  { key: 'check', label: 'Check payments' },
  { key: 'cod', label: 'Cash on delivery' },
  { key: 'paypal', label: 'PayPal' },
]

const money = (value) => `$${Number(value).toFixed(2)}`

// Shared classes
const INPUT_CLASS =
  'h-14 w-full border border-bg-footer bg-white px-5 font-jost font-normal text-sm leading-6 text-primary-black outline-none placeholder:text-secondColor focus:border-primary-black md:h-15'
const CHECKBOX_CLASS =
  "h-4 w-4 shrink-0 cursor-pointer appearance-none border border-bg-footer checked:border-primary-black checked:bg-primary-black checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M3.5 8.5l3 3 6-6.5'/%3E%3C/svg%3E\")]"
const RADIO_CLASS =
  'h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border border-bg-footer checked:border-primary-black checked:bg-primary-black checked:shadow-[inset_0_0_0_3px_#fff]'
const ROW_LABEL = 'font-jost font-medium text-sm uppercase text-primary-black'

const Checkout = () => {
  const location = useLocation()
  // Shipping option chosen on the Cart page (falls back to free shipping)
  const shippingKey = SHIPPING_OPTIONS[location.state?.shipping] ? location.state.shipping : 'free'
  const shippingOption = SHIPPING_OPTIONS[shippingKey]

  const [items, setItems] = useState(() => getCartItems())
  const [payment, setPayment] = useState('bank')

  // Keep the order summary in sync with the cart store
  useEffect(() => {
    const syncCart = () => setItems(getCartItems())
    return subscribeToCart(syncCart)
  }, [])

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )
  const vat = subtotal * VAT_RATE
  const total = subtotal + shippingOption.cost + vat

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend yet: the confirmation page will be connected here later
  }

  return (
    <main className="mt-15 md:mt-20 pb-12 md:pb-20 xl:pb-25 overflow-x-hidden">
      <Container>
        <div className="md:px-8 min-[1450px]:px-0">
          {/* Page title */}
          <h1 className="pt-6 md:pt-10 xl:pt-15 font-jost font-semibold text-2xl sm:text-3xl md:text-4xl xl:text-[40px] leading-tight uppercase text-primary-black">
            Shipping and Checkout
          </h1>

          {/* Steps (only step 02 on mobile) */}
          <div className="mt-6 md:mt-10 xl:mt-13.5 grid grid-cols-1 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.no}
                className={`${index === 1 ? 'block' : 'hidden md:block'} border-b-2 pb-3 md:pb-4.5 ${
                  index < 2
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
            <form
              onSubmit={handleSubmit}
              className="mt-8 md:mt-10 xl:mt-15.5 flex flex-col xl:flex-row xl:items-start xl:gap-10 2xl:gap-15"
            >
              {/* Left column: billing details */}
              <div className="w-full min-w-0 xl:flex-1">
                <h2 className="font-jost font-medium text-base leading-6 uppercase text-primary-black">
                  Billing Details
                </h2>

                <div className="mt-6 flex flex-col gap-4 md:mt-8 md:gap-7.5">
                  {/* First + last name */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-7.5">
                    <input type="text" name="firstName" placeholder="First Name" required className={INPUT_CLASS} />
                    <input type="text" name="lastName" placeholder="Last Name" required className={INPUT_CLASS} />
                  </div>

                  <input type="text" name="company" placeholder="Company Name (optional)" className={INPUT_CLASS} />

                  {/* Country select with label on the border */}
                  <div className="relative mt-1">
                    <label
                      htmlFor="country"
                      className="absolute left-4 -top-3 bg-white px-1 font-jost font-normal text-sm leading-6 text-primary-black"
                    >
                      Country / Region *
                    </label>
                    <select
                      id="country"
                      name="country"
                      defaultValue="Turkey"
                      required
                      className="h-14 w-full cursor-pointer appearance-none border border-primary-black bg-white px-5 pr-12 pt-3 font-jost font-normal text-sm leading-6 text-primary-black outline-none md:h-15"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
                      width="12"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6.50068 7.48182C6.77274 7.75387 7.22726 7.75387 7.50001 7.48182L13.7933 1.20459C14.0689 0.929053 14.0689 0.4822 13.7933 0.207356C13.5178 -0.0681855 13.0703 -0.0681855 12.7947 0.207356L7.00003 5.98593L1.20605 0.206657C0.929806 -0.0688846 0.482952 -0.0688847 0.206713 0.206657C-0.0688283 0.482198 -0.0688284 0.929051 0.206713 1.20389L6.50068 7.48182Z" fill="black" />
                    </svg>
                  </div>

                  {/* Street address (two lines) */}
                  <div className="flex flex-col gap-2.5">
                    <input type="text" name="street" placeholder="Street Address *" required className={INPUT_CLASS} />
                    <input type="text" name="street2" aria-label="Street address line 2" className={INPUT_CLASS} />
                  </div>

                  <input type="text" name="city" placeholder="Town / City *" required className={INPUT_CLASS} />
                  <input type="text" name="zip" placeholder="Postcode / ZIP *" required className={INPUT_CLASS} />
                  <input type="text" name="province" placeholder="Province *" required className={INPUT_CLASS} />
                  <input type="tel" name="phone" placeholder="Phone *" required className={INPUT_CLASS} />
                  <input type="email" name="email" placeholder="Your Mail" className={INPUT_CLASS} />
                </div>

                {/* Checkboxes */}
                <div className="mt-6 flex flex-col gap-3 md:mt-7.5">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input type="checkbox" name="createAccount" className={CHECKBOX_CLASS} />
                    <span className={ROW_LABEL}>Create an account?</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input type="checkbox" name="shipDifferent" className={CHECKBOX_CLASS} />
                    <span className={ROW_LABEL}>Ship to a different address?</span>
                  </label>
                </div>

                {/* Order notes */}
                <textarea
                  name="notes"
                  placeholder="Order Notes (optional)"
                  className="mt-6 block h-40 w-full resize-none border border-bg-footer bg-white p-5 font-jost font-normal text-sm leading-6 text-primary-black outline-none placeholder:text-secondColor focus:border-primary-black md:mt-7.5 md:h-50"
                />
              </div>

              {/* Right column: order summary + payment (below the form until xl) */}
              <div className="mt-10 w-full md:ml-auto md:max-w-105 xl:mt-0 xl:ml-0 xl:w-95 xl:max-w-none xl:shrink-0 2xl:w-105">
                {/* Your order */}
                <div className="border border-primary-black p-5 sm:p-6 xl:p-8 2xl:p-10">
                  <h3 className="font-jost font-medium text-base leading-6 uppercase text-primary-black">
                    Your Order
                  </h3>

                  <div className="mt-5 flex items-center justify-between border-b border-bg-footer pb-4 xl:mt-6">
                    <span className={ROW_LABEL}>Product</span>
                    <span className={ROW_LABEL}>Subtotal</span>
                  </div>

                  <div className="flex flex-col gap-3 border-b border-bg-footer py-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-4">
                        <span className="min-w-0 break-words font-jost font-normal text-sm leading-6 text-secondColor">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="shrink-0 font-jost font-normal text-sm leading-6 text-secondColor">
                          {money(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-b border-bg-footer py-4">
                    <span className={ROW_LABEL}>Subtotal</span>
                    <span className="font-jost font-medium text-sm text-primary-black">{money(subtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-bg-footer py-4">
                    <span className={ROW_LABEL}>Shipping</span>
                    <span className="font-jost font-normal text-sm text-primary-black">{shippingOption.label}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-bg-footer py-4">
                    <span className={ROW_LABEL}>VAT</span>
                    <span className="font-jost font-medium text-sm text-primary-black">{money(vat)}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className={ROW_LABEL}>Total</span>
                    <span className="font-jost font-medium text-sm text-primary-black">{money(total)}</span>
                  </div>
                </div>

                {/* Payment methods */}
                <div className="mt-5 border border-bg-footer p-5 sm:p-6 xl:p-8 2xl:p-10">
                  <div className="flex flex-col gap-4">
                    {PAYMENT_METHODS.map((method) => (
                      <div key={method.key}>
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value={method.key}
                            checked={payment === method.key}
                            onChange={() => setPayment(method.key)}
                            className={RADIO_CLASS}
                          />
                          <span className="font-jost font-normal text-base leading-6 text-primary-black">
                            {method.label}
                          </span>
                        </label>
                        {method.text && payment === method.key ? (
                          <p className="mt-3 pl-7 font-jost font-normal text-sm leading-5.5 text-primary-black">
                            {method.text}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 font-jost font-normal text-xs leading-5.5 text-primary-black">
                    Your personal data will be used to process your order, support your experience
                    throughout this website, and for other purposes described in our{' '}
                    <span className="text-redColor">privacy policy.</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="mt-5 h-14 w-full bg-primary-black font-jost font-medium text-sm uppercase text-primary-white transition hover:opacity-90 xl:h-15"
                >
                  Place order
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </main>
  )
}

export default Checkout
