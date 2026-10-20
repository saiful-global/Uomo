import React, { useState } from 'react'
import AccountLayout from '../Components/account/AccountLayout'

// Floating-label input (same "peer" pattern used in Login.jsx)
const FloatingInput = ({ id, label, type = 'text', value, onChange }) => {
  return (
    <div className='relative'>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=' '
        className='peer w-full h-15 border-2 border-bg-footer focus:border-primary-black px-5.5 outline-none font-jost font-normal text-sm leading-6 text-primary-black bg-primary-white duration-200'
      />
      <label
        htmlFor={id}
        className='absolute left-5.5 top-1/2 -translate-y-1/2 font-jost font-normal text-sm leading-6 text-secondColor transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:left-4 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-primary-black peer-focus:bg-primary-white peer-focus:px-1 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary-black peer-not-placeholder-shown:bg-primary-white peer-not-placeholder-shown:px-1'
      >
        {label}
      </label>
    </div>
  )
}

const AccountDetails = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  // message = { type: 'error' | 'success', text }
  const [message, setMessage] = useState(null)

  // One handler for every field, keyed by the field name
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setMessage(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Password rules (all three password fields may stay empty = unchanged)
    const wantsPasswordChange = form.newPassword || form.confirmPassword
    if (wantsPasswordChange && !form.currentPassword) {
      setMessage({ type: 'error', text: 'Please enter your current password.' })
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirm password do not match.' })
      return
    }

    // No backend, so nothing is stored. Only show feedback.
    setMessage({ type: 'success', text: 'Account details saved.' })
  }

  return (
    <AccountLayout title='ACCOUNT DETAILS'>
      <form onSubmit={handleSubmit} className='md:pt-1.5'>

        {/* First + Last name */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-7.5 md:gap-x-6.75'>
          <FloatingInput id='acc-first-name' label='First Name' value={form.firstName} onChange={handleChange('firstName')} />
          <FloatingInput id='acc-last-name' label='Last Name' value={form.lastName} onChange={handleChange('lastName')} />
        </div>

        {/* Display name */}
        <div className='mt-7.5'>
          <FloatingInput id='acc-display-name' label='Display Name' value={form.displayName} onChange={handleChange('displayName')} />
        </div>

        {/* Email */}
        <div className='mt-7.5'>
          <FloatingInput id='acc-email' label='Email Address' type='email' value={form.email} onChange={handleChange('email')} />
        </div>

        {/* Password change */}
        <h3 className='font-jost font-medium text-base leading-6 uppercase text-primary-black mt-7.5 mb-6'>
          PASSWORD CHANGE
        </h3>

        <div className='flex flex-col gap-7.5'>
          <FloatingInput id='acc-current-password' label='Current password (leave blank to leave unchanged)' type='password' value={form.currentPassword} onChange={handleChange('currentPassword')} />
          <FloatingInput id='acc-new-password' label='New password (leave blank to leave unchanged)' type='password' value={form.newPassword} onChange={handleChange('newPassword')} />
          <FloatingInput id='acc-confirm-password' label='Confirm new password' type='password' value={form.confirmPassword} onChange={handleChange('confirmPassword')} />
        </div>

        {/* Save button */}
        <button
          type='submit'
          className='mt-8 w-full md:w-75 h-15 bg-primary-black text-primary-white font-jost font-medium text-sm leading-6 uppercase cursor-pointer hover:bg-redColor duration-200'
        >
          SAVE CHANGES
        </button>

        {/* Feedback text */}
        {message && (
          <p
            role='status'
            className={`mt-4 font-jost font-normal text-sm leading-6 ${message.type === 'error' ? 'text-redColor' : 'text-primary-black'}`}
          >
            {message.text}
          </p>
        )}
      </form>
    </AccountLayout>
  )
}

export default AccountDetails
