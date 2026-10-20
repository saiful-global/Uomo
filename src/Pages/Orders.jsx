import React, { useState } from 'react'
import { Link } from 'react-router'
import AccountLayout from '../Components/account/AccountLayout'
import { getOrders } from '../api/cartStore'

// There is no backend, so every placed order has the same demo status.
const STATUS_LABEL = 'On hold'

// "October 27, 2020". If the saved date cannot be parsed, show it as it is.
const formatDate = (value) => {
  const d = new Date(value)
  if (!value || Number.isNaN(d.getTime())) return String(value || '')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const formatMoney = (value) => {
  const n = Number(value)
  if (!Number.isFinite(n)) return '$0.00'
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Total quantity of all items in one order
const countItems = (order) =>
  Array.isArray(order.items)
    ? order.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
    : 0

const totalText = (order) => {
  const count = countItems(order)
  return `${formatMoney(order.total)} for ${count} ${count === 1 ? 'item' : 'items'}`
}

const textClass = 'font-jost font-normal text-sm leading-6 text-primary-black'
const thClass = 'font-jost font-medium text-sm leading-6 uppercase text-primary-black text-left'
const viewBtnClass =
  'flex items-center justify-center w-full max-w-35 h-12.5 bg-primary-black text-primary-white font-jost font-medium text-sm leading-6 uppercase hover:bg-redColor duration-200'

const Orders = () => {
  // Newest order first. Read once on mount (no setState inside useEffect).
  const [orders] = useState(() => [...getOrders()].reverse())

  return (
    <AccountLayout title='ORDERS'>
      {orders.length === 0 ? (
        <div>
          <p className={textClass}>No order has been made yet.</p>
          <Link
            to='/shop'
            className='inline-flex items-center justify-center w-full sm:w-52 h-12.5 mt-6 bg-primary-black text-primary-white font-jost font-medium text-sm uppercase hover:bg-redColor duration-200'
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table (xl and up) */}
          <table className='hidden xl:table w-full table-fixed border border-bg-footer border-collapse'>
            <thead>
              <tr className='bg-bg-footer h-12.5'>
                <th className={`${thClass} pl-7.5 w-[16.5%]`}>Order</th>
                <th className={`${thClass} w-[27.8%]`}>Date</th>
                <th className={`${thClass} w-[15.3%]`}>Status</th>
                <th className={`${thClass} w-[24.1%]`}>Total</th>
                <th className={`${thClass} w-[16.3%]`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderNumber} className='h-27.75 border-b border-bg-footer last:border-b-0'>
                  <td className={`${textClass} pl-7.5`}>
                    <Link to='/order-tracking' className='underline hover:text-redColor duration-200'>
                      #{order.orderNumber}
                    </Link>
                  </td>
                  <td className={textClass}>{formatDate(order.date)}</td>
                  <td className={textClass}>{STATUS_LABEL}</td>
                  <td className={textClass}>{totalText(order)}</td>
                  <td>
                    <Link to='/order-tracking' className={viewBtnClass}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cards for mobile and tablet (below xl) */}
          <ul className='xl:hidden flex flex-col gap-4'>
            {orders.map((order) => (
              <li key={order.orderNumber} className='border border-bg-footer p-5'>
                <dl className='flex flex-col gap-3'>
                  <div className='flex justify-between gap-4'>
                    <dt className={`${thClass}`}>Order</dt>
                    <dd className={textClass}>
                      <Link to='/order-tracking' className='underline hover:text-redColor duration-200'>
                        #{order.orderNumber}
                      </Link>
                    </dd>
                  </div>
                  <div className='flex justify-between gap-4'>
                    <dt className={thClass}>Date</dt>
                    <dd className={`${textClass} text-right`}>{formatDate(order.date)}</dd>
                  </div>
                  <div className='flex justify-between gap-4'>
                    <dt className={thClass}>Status</dt>
                    <dd className={textClass}>{STATUS_LABEL}</dd>
                  </div>
                  <div className='flex justify-between gap-4'>
                    <dt className={thClass}>Total</dt>
                    <dd className={`${textClass} text-right`}>{totalText(order)}</dd>
                  </div>
                </dl>
                <Link to='/order-tracking' className={`${viewBtnClass} max-w-none mt-5`}>View</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </AccountLayout>
  )
}

export default Orders
