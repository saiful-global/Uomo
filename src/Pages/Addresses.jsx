import React from 'react'
import AccountLayout from '../Components/account/AccountLayout'

// There is no backend, so these are static demo addresses (same text as the Figma design).
const ADDRESSES = [
  {
    id: 'billing',
    title: 'BILLING ADDRESS',
    name: 'Daniel Robinson',
    lines: ['1418 River Drive, Suite 35 Cottonhall, CA 9622', 'United States'],
    email: 'sale@uomo.com',
    phone: '+1 246-345-0695',
  },
  {
    id: 'shipping',
    title: 'SHIPPING ADDRESS',
    name: 'Daniel Robinson',
    lines: ['1418 River Drive, Suite 35 Cottonhall, CA 9622', 'United States'],
    email: 'sale@uomo.com',
    phone: '+1 246-345-0695',
  },
]

const textClass = 'font-jost font-normal text-sm leading-6 text-primary-black'

const Addresses = () => {
  return (
    <AccountLayout title='ADDRESSES'>
      <p className={textClass}>
        The following addresses will be used on the checkout page by default.
      </p>

      <div className='mt-10 md:mt-15 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[386px_386px] gap-10 md:gap-x-8 xl:gap-x-23'>
        {ADDRESSES.map((address) => (
          <div key={address.id}>
            {/* Title + EDIT (edit does nothing yet, there is no backend) */}
            <div className='flex items-center justify-between gap-4'>
              <h2 className='font-jost font-normal text-xl leading-7 uppercase text-primary-black'>
                {address.title}
              </h2>
              <button
                type='button'
                className='font-jost font-medium text-xs leading-4 uppercase text-primary-black pb-0.5 border-b-2 border-primary-black hover:text-redColor hover:border-redColor duration-200 cursor-pointer'
              >
                Edit
              </button>
            </div>

            <address className='not-italic mt-3.5'>
              <p className={textClass}>{address.name}</p>
              {address.lines.map((line) => (
                <p key={line} className={textClass}>{line}</p>
              ))}
              <p className={`${textClass} mt-6`}>{address.email}</p>
              <p className={textClass}>{address.phone}</p>
            </address>
          </div>
        ))}
      </div>
    </AccountLayout>
  )
}

export default Addresses
