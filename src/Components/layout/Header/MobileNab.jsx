import React, { useState } from 'react'
import { Link } from 'react-router'
import Image from '../../common/Image';
import { navitems } from '../../../api/navbarData';
import { MdChevronRight } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaPinterest } from 'react-icons/fa'
import { FaXTwitter,FaYoutube } from "react-icons/fa6";

const MobileNab = () => {

    const cartItems = 3;
    const [mobileMenu, setMobileMenu] = useState(false);

  return (
        <div className='mobile_nav flex justify-between mx-3.75 items-center md:hidden'>
            {/* Menu Bar icon with toogle */}
            {mobileMenu ?
            (<button onClick={()=>setMobileMenu(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z" fill="#222222"/>
                <path d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z" fill="#222222"/>
                </svg>
            </button>)
            :
            (<button onClick={()=>setMobileMenu(true)}>
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="25.0435" height="2" fill="#222222"/>
                <rect y="8" width="20.0348" height="2" fill="#222222"/>
                <rect y="16" width="25.0435" height="2" fill="#222222"/>
                </svg>
            </button>)
            }
            {/* Logo  */}
            <Link to="/">
                <Image className="w-28" src="/images/logo.png" alt="logo" ></Image>
            </Link>
            {/* Cart */}
            <div className='relative'>
                <button>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6869 4.6875H15.3021C14.9912 2.05164 12.74 0 10.0174 0C7.29479 0 5.04353 2.05164 4.73264 4.6875H2.3478C1.91556 4.6875 1.56519 5.03727 1.56519 5.46875V19.2188C1.56519 19.6502 1.91556 20 2.3478 20H17.6869C18.1192 20 18.4696 19.6502 18.4696 19.2188V5.46875C18.4696 5.03727 18.1192 4.6875 17.6869 4.6875ZM10.0174 1.5625C11.8754 1.5625 13.4225 2.91621 13.7214 4.6875H6.31332C6.61228 2.91621 8.1593 1.5625 10.0174 1.5625ZM16.9043 18.4375H3.13041V6.25H4.69563V8.59375C4.69563 9.02523 5.046 9.375 5.47824 9.375C5.91047 9.375 6.26084 9.02523 6.26084 8.59375V6.25H13.7739V8.59375C13.7739 9.02523 14.1243 9.375 14.5565 9.375C14.9887 9.375 15.3391 9.02523 15.3391 8.59375V6.25H16.9043V18.4375Z" fill="#222222"/>
                    </svg>
                </button>
                <span className='font-jost bg-thirdColor px-1.25 py-px text-primary-white rounded-full font-medium text-[10px] absolute bottom-0 left-3 '>{cartItems}</span>
            </div>

            {/* Menu list absolute div  */} 
            <div className={`${mobileMenu? "w-full": "w-0"} bottom-0 bg-white fixed top-15 left-0 border-t border-bg-footer z-50 duration-400 transition-all overflow-hidden `}>
                <div>
                    {/* search box  */}
                    <div className="relative mb-4.25 mx-3.75 mt-5.25">
                        <input type="text" placeholder="Search products..." className="w-full border border-bg-footer rounded-[3px] pt-4.25 pb-3.5 px-4.25 outline-none focus:border-black text-sm font-jost font-normal leading-6" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_164_9153)">
                            <path d="M7.92682 0C3.55609 0 0 3.55609 0 7.92682C0 12.2978 3.55609 15.8536 7.92682 15.8536C12.2978 15.8536 15.8536 12.2978 15.8536 7.92682C15.8536 3.55609 12.2978 0 7.92682 0ZM7.92682 14.3903C4.36293 14.3903 1.46341 11.4907 1.46341 7.92685C1.46341 4.36296 4.36293 1.46341 7.92682 1.46341C11.4907 1.46341 14.3902 4.36293 14.3902 7.92682C14.3902 11.4907 11.4907 14.3903 7.92682 14.3903Z" fill="#222222"/>
                            <path d="M17.7856 16.751L13.5905 12.5558C13.3046 12.27 12.8417 12.27 12.5558 12.5558C12.27 12.8414 12.27 13.3049 12.5558 13.5905L16.7509 17.7856C16.8939 17.9285 17.081 18 17.2683 18C17.4553 18 17.6427 17.9285 17.7856 17.7856C18.0715 17.5 18.0715 17.0366 17.7856 16.751Z" fill="#222222"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_164_9153">
                            <rect width="18" height="18" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </span>
                    </div>
                    {/* list item  */}
                    <ul className=' flex flex-col items-start mx-3.75'>
                        {
                            navitems?.map((item)=>(
                                <li className='font-jost font-medium text-base leading-11.25 w-full flex justify-between items-center' key={item.id}>
                                    <Link to={item.url}>
                                        {item.name}
                                    </Link>
                                    <MdChevronRight size={20} />
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* menu's bottom part  */}
                <div className='absolute bottom-0 left-0 border-t border-bg-footer w-full'>
                    <div className='mx-3.75 pb-5'>
                        <div className='pt-7.25 font-jost font-medium text-sm leading-6 flex gap-3.25 pb-4.25'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_164_9143)">
                            <path d="M9.00003 10.1387C3.5917 10.1387 0.613159 12.6972 0.613159 17.3431C0.613159 17.7059 0.907241 18 1.27009 18H16.7299C17.0928 18 17.3869 17.7059 17.3869 17.3431C17.3869 12.6974 14.4084 10.1387 9.00003 10.1387ZM1.95092 16.6861C2.20932 13.2125 4.57755 11.4526 9.00003 11.4526C13.4225 11.4526 15.7908 13.2125 16.0494 16.6861H1.95092V16.6861Z" fill="#222222"/>
                            <path d="M8.99998 0C6.51567 0 4.64233 1.91102 4.64233 4.44505C4.64233 7.05329 6.59716 9.17497 8.99998 9.17497C11.4028 9.17497 13.3576 7.05329 13.3576 4.44526C13.3576 1.91102 11.4843 0 8.99998 0ZM8.99998 7.86132C7.32152 7.86132 5.95619 6.3289 5.95619 4.44526C5.95619 2.63081 7.23634 1.31386 8.99998 1.31386C10.7354 1.31386 12.0438 2.65992 12.0438 4.44526C12.0438 6.3289 10.6784 7.86132 8.99998 7.86132Z" fill="#222222"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_164_9143">
                            <rect width="18" height="18" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <h3>MY ACCOUNT</h3>
                        </div>
                        <div className='flex items-center'>
                            <h4 className='font-jost font-normal text-sm leading-6 text-secondColor pr-6.75'>Language</h4>
                            <h4 className='cursor-pointer font-jost font-normal text-sm leading-6 text-primary-black pr-4'>United Kingdom  |  English</h4>
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.50068 7.48182C6.77274 7.75387 7.22726 7.75387 7.50001 7.48182L13.7933 1.20459C14.0689 0.929053 14.0689 0.4822 13.7933 0.207356C13.5178 -0.0681855 13.0703 -0.0681855 12.7947 0.207356L7.00003 5.98593L1.20605 0.206657C0.929806 -0.0688846 0.482952 -0.0688847 0.206713 0.206657C-0.0688283 0.482198 -0.0688284 0.929051 0.206713 1.20389L6.50068 7.48182Z" fill="black"/>
                            </svg>
                        </div>
                        <div className='flex items-center pt-4'>
                            <h4 className='font-jost font-normal text-sm leading-6 text-secondColor pr-5.75'>Currency</h4>
                            <h4 className='cursor-pointer font-jost font-normal text-sm leading-6 text-primary-black pr-2.5'>$ USD</h4>
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.50068 7.48182C6.77274 7.75387 7.22726 7.75387 7.50001 7.48182L13.7933 1.20459C14.0689 0.929053 14.0689 0.4822 13.7933 0.207356C13.5178 -0.0681855 13.0703 -0.0681855 12.7947 0.207356L7.00003 5.98593L1.20605 0.206657C0.929806 -0.0688846 0.482952 -0.0688847 0.206713 0.206657C-0.0688283 0.482198 -0.0688284 0.929051 0.206713 1.20389L6.50068 7.48182Z" fill="black"/>
                            </svg>
                        </div>
                        {/* Social Icons  */}
                        <div className='pt-6 flex gap-9'>
                            <a href="">
                                <FaFacebookF className='text-primary-black' />
                            </a>
                            <a href="">
                                <FaXTwitter className='text-primary-black' />
                            </a>
                            <a href="">
                                <FaInstagram className='text-primary-black' />
                            </a>
                            <a href="">
                                <FaYoutube className='text-primary-black' />
                            </a>
                            <a href="">
                                <FaPinterest className='text-primary-black' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MobileNab