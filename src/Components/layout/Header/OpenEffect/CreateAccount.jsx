import React from 'react';

const CreateAccount = () => {

  return (
    <form onSubmit={(e) => e.preventDefault()} className='pl-8.5 pr-10 md:px-10 mx-auto pt-7.75'>

      {/* Username  */}
      <div className='relative mb-7.25'>
        <input
          id="register-username"
          type="text"
          placeholder=" "
          className="peer w-full border border-bg-footer pt-4.25 pb-3.5 px-4.25 outline-none focus:border-black text-sm font-jost font-normal leading-6"
        />
        <label
          htmlFor="register-username"
          className="absolute left-4.25 top-1/2 -translate-y-1/2 font-jost font-normal text-sm leading-6 text-secondColor transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:left-4 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-black peer-focus:bg-primary-white peer-focus:px-1 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary-black peer-not-placeholder-shown:bg-primary-white peer-not-placeholder-shown:px-1"
        >
          Username
        </label>
      </div>

      {/* Email address  */}
      <div className='relative mb-7.5'>
        <input
          id="register-email"
          type="email"
          placeholder=" "
          className="peer w-full border border-bg-footer pt-4.25 pb-3.5 px-4.25 outline-none focus:border-black text-sm font-jost font-normal leading-6"
        />
        <label
          htmlFor="register-email"
          className="absolute left-4.25 top-1/2 -translate-y-1/2 font-jost font-normal text-sm leading-6 text-secondColor transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:left-4 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-black peer-focus:bg-primary-white peer-focus:px-1 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary-black peer-not-placeholder-shown:bg-primary-white peer-not-placeholder-shown:px-1"
        >
          Email address *
        </label>
      </div>

      {/* Password  */}
      <div className='relative mb-5.25'>
        <input
          id="register-password"
          type="password"
          placeholder=" "
          className="peer w-full border border-bg-footer pt-4.25 pb-3.5 px-4.25 outline-none focus:border-black text-sm font-jost font-normal leading-6"
        />
        <label
          htmlFor="register-password"
          className="absolute left-4.25 top-1/2 -translate-y-1/2 font-jost font-normal text-sm leading-6 text-secondColor transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:left-4 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-black peer-focus:bg-primary-white peer-focus:px-1 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary-black peer-not-placeholder-shown:bg-primary-white peer-not-placeholder-shown:px-1"
        >
          Password *
        </label>
      </div>

      {/* Disclaimer text  */}
      <p className='font-jost font-normal text-sm leading-6 text-secondColor pb-6.25'>
        Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
      </p>

      {/* Register button  */}
      <button type="submit" className='w-full bg-primary-black text-primary-white font-jost font-medium text-sm uppercase leading-6 pt-5.5 pb-3.5 cursor-pointer'>
        REGISTER
      </button>

    </form>
  );
}

export default CreateAccount;