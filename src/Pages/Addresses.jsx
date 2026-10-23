import React, { useState } from 'react'
import AccountLayout from '../Components/account/AccountLayout'

// There is no backend, so these are static demo addresses (same text as the Figma design).
// Edits are kept in local state only and reset on page reload.
const INITIAL_ADDRESSES = [
  {
    id: 'billing',
    title: 'BILLING ADDRESS',
    name: 'Daniel Robinson',
    street: '1418 River Drive, Suite 35 Cottonhall, CA 9622',
    country: 'United States',
    email: 'sale@uomo.com',
    phone: '+1 246-345-0695',
  },
  {
    id: 'shipping',
    title: 'SHIPPING ADDRESS',
    name: 'Daniel Robinson',
    street: '1418 River Drive, Suite 35 Cottonhall, CA 9622',
    country: 'United States',
    email: 'sale@uomo.com',
    phone: '+1 246-345-0695',
  },
]

const FIELDS = [
  { name: 'name', label: 'Full Name', type: 'text', autoComplete: 'name' },
  { name: 'street', label: 'Street Address', type: 'text', autoComplete: 'street-address' },
  { name: 'country', label: 'Country', type: 'text', autoComplete: 'country-name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
]

const textClass = 'font-jost font-normal text-sm leading-6 text-primary-black'

const inputClass =
  'w-full h-12 px-4 border border-bg-footer bg-primary-white font-jost font-normal text-base md:text-sm text-primary-black outline-none focus:border-primary-black duration-200'

const labelClass =
  'block mb-1.5 font-jost font-medium text-xs leading-4 uppercase text-secondColor'

// Edit form (defined outside the page component, it is mounted only while editing)
const AddressForm = ({ address, onSave, onCancel }) => {
  const [values, setValues] = useState({
    name: address.name,
    street: address.street,
    country: address.country,
    email: address.email,
    phone: address.phone,
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = {}
    for (const field of FIELDS) {
      trimmed[field.name] = values[field.name].trim()
    }
    const emptyField = FIELDS.find((field) => !trimmed[field.name])
    if (emptyField) {
      setError(`${emptyField.label} is required.`)
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmed.email)) {
      setError('Please enter a valid email address.')
      return
    }
    onSave(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className='mt-5 flex flex-col gap-4'>
      {FIELDS.map((field) => (
        <div key={field.name} className='min-w-0'>
          <label htmlFor={`${address.id}-${field.name}`} className={labelClass}>
            {field.label}
          </label>
          <input
            id={`${address.id}-${field.name}`}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            value={values[field.name]}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      ))}

      {error && (
        <p role='alert' className='font-jost font-normal text-sm leading-6 text-redColor'>
          {error}
        </p>
      )}

      <div className='mt-2 flex flex-col min-[400px]:flex-row gap-3'>
        <button
          type='submit'
          className='h-12 px-8 bg-primary-black text-primary-white font-jost font-medium text-xs leading-4 uppercase hover:bg-redColor duration-200 cursor-pointer'
        >
          Save
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='h-12 px-8 border border-primary-black text-primary-black font-jost font-medium text-xs leading-4 uppercase hover:text-redColor hover:border-redColor duration-200 cursor-pointer'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const Addresses = () => {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES)
  const [editingId, setEditingId] = useState(null)

  const handleSave = (id, values) => {
    setAddresses((prev) =>
      prev.map((address) => (address.id === id ? { ...address, ...values } : address))
    )
    setEditingId(null)
  }

  return (
    <AccountLayout title='ADDRESSES'>
      <p className={textClass}>
        The following addresses will be used on the checkout page by default.
      </p>

      <div className='mt-10 md:mt-15 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[386px_386px] gap-10 md:gap-x-8 xl:gap-x-23'>
        {addresses.map((address) => (
          <div key={address.id} className='min-w-0'>
            {/* Title + EDIT */}
            <div className='flex items-center justify-between gap-4'>
              <h2 className='font-jost font-normal text-xl leading-7 uppercase text-primary-black'>
                {address.title}
              </h2>
              {editingId !== address.id && (
                <button
                  type='button'
                  onClick={() => setEditingId(address.id)}
                  className='font-jost font-medium text-xs leading-4 uppercase text-primary-black pb-0.5 border-b-2 border-primary-black hover:text-redColor hover:border-redColor duration-200 cursor-pointer'
                >
                  Edit
                </button>
              )}
            </div>

            {editingId === address.id ? (
              <AddressForm
                key={address.id}
                address={address}
                onSave={(values) => handleSave(address.id, values)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <address className='not-italic mt-3.5 [overflow-wrap:anywhere]'>
                <p className={textClass}>{address.name}</p>
                <p className={textClass}>{address.street}</p>
                <p className={textClass}>{address.country}</p>
                <p className={`${textClass} mt-6`}>{address.email}</p>
                <p className={textClass}>{address.phone}</p>
              </address>
            )}
          </div>
        ))}
      </div>
    </AccountLayout>
  )
}

export default Addresses
