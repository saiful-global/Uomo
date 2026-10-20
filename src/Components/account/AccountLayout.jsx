import React from 'react'
import { NavLink } from 'react-router'
import Container from '../ui/Container'

// Sidebar menu shared by every My Account page.
// "to" must match the routes added in App.jsx.
const menuItems = [
  { id: 1, name: 'DASHBOARD', to: '/my-account' },
  { id: 2, name: 'ORDERS', to: '/my-account/orders' },
  { id: 3, name: 'DOWNLOADS', to: '/my-account/downloads' },
  { id: 4, name: 'ADDRESSES', to: '/my-account/addresses' },
  { id: 5, name: 'ACCOUNT DETAILS', to: '/my-account/account-details' },
  { id: 6, name: 'WISHLIST', to: '/my-account/wishlist' },
  { id: 7, name: 'LOGOUT', to: '/' },
]

const AccountLayout = ({ title, children }) => {
  return (
    <section className='mt-15 md:mt-20 pb-20 md:pb-28'>
      <Container>
        {/* Side space for tablets, removed on very wide screens where Container already centers the content */}
        <div className='md:px-6 min-[1450px]:px-0'>

          {/* Page title */}
          <h1 className='font-jost font-bold text-[28px] md:text-[40px] leading-9 md:leading-12 uppercase text-primary-black pt-8 md:pt-19'>
            {title}
          </h1>

          <div className='mt-6 md:mt-13 grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[360px_1fr] gap-8 md:gap-0'>

            {/* Sidebar: horizontal scroll row on mobile, vertical list from md */}
            <nav aria-label='My account menu'>
              <ul className='flex md:flex-col gap-6 md:gap-6.5 overflow-x-auto md:overflow-visible pb-3 md:pb-0 border-b border-bg-footer md:border-0'>
                {menuItems.map((item) => (
                  <li key={item.id} className='shrink-0'>
                    {/* Active tab is detected from the current URL */}
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `relative inline-block font-jost font-medium text-sm leading-6 uppercase duration-200 hover:text-redColor ${
                          isActive
                            ? 'text-redColor after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:w-10 after:h-0.5 after:bg-redColor'
                            : 'text-primary-black'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Page content */}
            <div className='min-w-0'>{children}</div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AccountLayout
