import React, { useState } from 'react'
import Container from '../Components/ui/Container'
import { findOrder } from '../api/cartStore'

const money = (value) => `$${Number(value).toFixed(2)}`

// Floating label input (same pattern as Login.jsx): the label sits on the border
// while the field is focused or has a value. The input needs placeholder=" " for this to work.
const INPUT_CLASS =
  'peer h-14 w-full border border-bg-footer bg-white px-4 pt-1 font-jost font-normal text-sm leading-6 text-primary-black outline-none focus:border-primary-black focus:ring-1 focus:ring-inset focus:ring-primary-black'
const LABEL_CLASS =
  'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-jost font-normal text-sm leading-6 text-secondColor transition-all duration-200 peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-focus:text-primary-black peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:text-primary-black'

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  // null = nothing searched yet, 'notfound' = no match, object = the matching order
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend: orders are looked up in the browser (saved when the Confirmation page opens)
    setResult(findOrder(orderId, email) || 'notfound')
  }

  return (
    <main className="mt-15 md:mt-20 pb-16 md:pb-20 xl:pb-22.5 overflow-x-hidden">
      <Container>
        <div className="md:px-7.5 min-[1470px]:px-0">
          {/* Page title */}
          <h1 className="pt-6 md:pt-10 xl:pt-15 text-center font-jost font-semibold text-2xl sm:text-3xl md:text-4xl xl:text-[40px] leading-tight uppercase text-primary-black">
            Order Tracking
          </h1>

          <div className="mx-auto mt-6 w-full max-w-125 md:mt-10 xl:mt-12">
            <p className="text-center font-jost font-normal text-sm leading-6 text-secondColor">
              To track your order please enter your Order ID in the box below and press the
              &quot;Track&quot; button. This was given to you on your receipt and in the
              confirmation email you should have received.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6 md:mt-7.5 md:gap-7.5">
              <div className="relative">
                <input
                  id="orderId"
                  type="text"
                  inputMode="numeric"
                  name="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder=" "
                  required
                  className={INPUT_CLASS}
                />
                <label htmlFor="orderId" className={LABEL_CLASS}>
                  Order ID
                </label>
              </div>

              <div className="relative">
                <input
                  id="billingEmail"
                  type="email"
                  name="billingEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                  className={INPUT_CLASS}
                />
                <label htmlFor="billingEmail" className={LABEL_CLASS}>
                  Billing email
                </label>
              </div>

              <button
                type="submit"
                className="h-14 w-full bg-primary-black font-jost font-medium text-sm uppercase text-primary-white transition hover:opacity-90 md:-mt-1.75 md:h-15"
              >
                Track
              </button>
            </form>

            {/* Result */}
            {result === 'notfound' ? (
              <p className="mt-6 text-center font-jost font-normal text-sm leading-6 text-redColor">
                We could not find an order with these details. Please check your Order ID and email.
              </p>
            ) : null}

            {result && result !== 'notfound' ? (
              <div className="mt-6 border border-primary-black p-5 sm:p-6">
                {[
                  ['Order Number', result.orderNumber],
                  ['Date', result.date],
                  ['Status', 'Processing'],
                  ['Total', money(result.total)],
                  ['Payment Method', result.paymentLabel],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 border-b border-bg-footer py-3 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <span className="font-jost font-medium text-sm uppercase text-primary-black">{label}</span>
                    <span className="min-w-0 break-words text-right font-jost font-normal text-sm text-primary-black">{value}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </main>
  )
}

export default OrderTracking
