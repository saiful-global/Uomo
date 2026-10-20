import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import Container from '../Components/ui/Container'
import { clearCart } from '../api/cartStore'

const STEPS = [
  { no: '01', title: 'Shopping Bag', text: 'Manage Your Items List' },
  { no: '02', title: 'Shipping and Checkout', text: 'Checkout Your Items List' },
  { no: '03', title: 'Confirmation', text: 'Review And Submit Your Order' },
]

const money = (value) => `$${Number(value).toFixed(2)}`

// Shared classes (same style as the Checkout order summary)
const ROW_LABEL = 'font-jost font-medium text-sm uppercase text-primary-black'
const ROW_VALUE = 'font-jost font-normal text-sm text-primary-black'

const Confirmation = () => {
  const location = useLocation()
  // The order is sent from the Checkout page through router state.
  // Everything (items, totals, shipping, payment) is already calculated there,
  // so this page never recalculates VAT or shipping and cannot show a different total.
  const order = location.state?.order

  // The order is placed, so empty the cart (safe to run twice: clearing an empty cart does nothing)
  useEffect(() => {
    if (order) clearCart()
  }, [order])

  return (
    <main className="mt-15 md:mt-20 pb-12 md:pb-20 xl:pb-25 overflow-x-hidden">
      <Container>
        <div className="md:px-8 min-[1450px]:px-0">
          {/* Page title */}
          <h1 className="pt-6 md:pt-10 xl:pt-15 font-jost font-semibold text-2xl sm:text-3xl md:text-4xl xl:text-[40px] leading-tight uppercase text-primary-black">
            Order Received
          </h1>

          {/* Steps (only step 03 on mobile, all three are active here) */}
          <div className="mt-6 md:mt-10 xl:mt-13.5 grid grid-cols-1 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.no}
                className={`${index === 2 ? 'block' : 'hidden md:block'} border-b-2 border-primary-black pb-3 md:pb-4.5 text-primary-black`}
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

          {!order ? (
            /* Opened directly by URL (no order data) */
            <div className="py-16 md:py-20 text-center">
              <p className="font-jost font-normal text-base text-secondColor">
                No order found.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-block bg-primary-black px-8 py-4 font-jost font-medium text-sm uppercase text-primary-white"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-225 md:mt-12.5">
              {/* Success icon + message */}
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-thirdColor md:h-20 md:w-20">
                  <svg
                    className="h-6 w-6 md:h-8 md:w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                </div>
                <h2 className="mt-6 md:mt-8 font-jost font-normal text-2xl md:text-4xl leading-tight text-primary-black">
                  Your order is completed!
                </h2>
                <p className="mt-1 font-jost font-normal text-sm leading-6 text-secondColor">
                  Thank you. Your order has been received.
                </p>
              </div>

              {/* Order info box (dashed) */}
              <div className="mt-8 border border-dashed border-primary-black px-5 py-6 md:mt-12 md:px-10.5 md:py-8.5">
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-[180px_177px_151px_minmax(0,1fr)] md:gap-x-0">
                  <div>
                    <p className="font-jost font-normal text-sm leading-6 text-secondColor">Order Number</p>
                    <p className="mt-2 font-jost font-medium text-base leading-6 text-primary-black">
                      {order.orderNumber}
                    </p>
                  </div>
                  <div>
                    <p className="font-jost font-normal text-sm leading-6 text-secondColor">Date</p>
                    <p className="mt-2 font-jost font-medium text-base leading-6 text-primary-black">
                      {order.date}
                    </p>
                  </div>
                  <div>
                    <p className="font-jost font-normal text-sm leading-6 text-secondColor">Total</p>
                    <p className="mt-2 font-jost font-medium text-base leading-6 text-primary-black">
                      {money(order.total)}
                    </p>
                  </div>
                  <div>
                    <p className="font-jost font-normal text-sm leading-6 text-secondColor">Payment Method</p>
                    <p className="mt-2 font-jost font-medium text-base leading-6 text-primary-black capitalize">
                      {order.paymentLabel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order details box */}
              <div className="mt-8 border border-primary-black p-5 sm:p-8 md:mt-9 md:p-10">
                <h3 className="font-jost font-medium text-base leading-6 uppercase text-primary-black">
                  Order Details
                </h3>

                <div className="mt-6 flex items-center justify-between border-b border-bg-footer pb-4 md:mt-8">
                  <span className={ROW_LABEL}>Product</span>
                  <span className={ROW_LABEL}>Subtotal</span>
                </div>

                {/* Ordered items */}
                <div className="flex flex-col gap-3 border-b border-bg-footer py-4 md:py-5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4">
                      <span className="min-w-0 break-words font-jost font-normal text-sm leading-6 text-secondColor">
                        {item.name}
                        {item.quantity > 1 ? ` x${item.quantity}` : ''}
                      </span>
                      <span className="shrink-0 font-jost font-normal text-sm leading-6 text-secondColor">
                        {money(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-b border-bg-footer py-4 md:py-5">
                  <span className={ROW_LABEL}>Subtotal</span>
                  <span className={ROW_VALUE}>{money(order.subtotal)}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-bg-footer py-4 md:py-5">
                  <span className={ROW_LABEL}>Shipping</span>
                  <span className={ROW_VALUE}>{order.shippingLabel}</span>
                </div>

                <div className="flex items-center justify-between border-b border-bg-footer py-4 md:py-5">
                  <span className={ROW_LABEL}>VAT</span>
                  <span className={ROW_VALUE}>{money(order.vat)}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-bg-footer py-4 md:py-5">
                  <span className={ROW_LABEL}>Payment Method</span>
                  <span className={ROW_VALUE}>{order.paymentLabel}</span>
                </div>

                <div className="flex items-center justify-between pt-4 md:pt-5">
                  <span className={ROW_LABEL}>Total</span>
                  <span className={ROW_VALUE}>{money(order.total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}

export default Confirmation
