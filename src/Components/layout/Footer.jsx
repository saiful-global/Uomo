import React from 'react'
import Container from '../ui/Container'
import Image from '../Common/Image'
import SecurePaymentsImage from '../../assets/images/SecurePaymentsImage.png'
import { FaFacebookF, FaInstagram, FaPinterest } from 'react-icons/fa'
import { FaXTwitter,FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
    <footer className='bg-[#E4E4E4] pt-25'>
      <Container>
        <div className='flex justify-between'>
          <div>
            <Image className="pb-11.25" src="/images/logo.png"></Image>
            <p className='font-jost font-normal text-sm leading-6 text-primary-black'>1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
            <p className='font-jost font-normal text-sm leading-6 text-primary-black pb-9.25'>United States</p>
            <p className='font-jost font-medium text-sm leading-6 text-primary-black'>sale@uomo.com</p>
            <p className='font-jost font-medium text-sm leading-6 text-primary-black'>+1 246-345-0695</p>
            
            {/* Social Icons  */}
            <div className='pt-11.75 flex gap-9'>
              <a href="">
                <FaFacebookF className='hover:text-blue-500 cursor-pointer' />
              </a>
              <a href="">
                <FaXTwitter className='hover:text-black cursor-pointer' />
              </a>
              <a href="">
                <FaInstagram className='hover:text-pink-600 cursor-pointer' />
              </a>
              <a href="">
              <FaYoutube className='hover:text-red-600 cursor-pointer' />
              </a>
              <a href="">
              <FaPinterest className='hover:text-red-600 cursor-pointer' />
              </a>
            </div>
          </div>
          <div className='flex flex-col'>
            <h3 className='font-jost font-medium text-[18px] text-primary-black pb-6.75'>COMPANY</h3>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">About Us</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Careers</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Affiliates</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Blog</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Contact Us</a>
          </div>
          <div className='flex flex-col'>
            <h3 className='font-jost font-medium text-[18px] text-primary-black pb-6.75'>SHOP</h3>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">New Arrivals</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Accessories</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Men</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Women</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Shop All</a>
          </div>
          <div className='flex flex-col'>
            <h3 className='font-jost font-medium text-[18px] text-primary-black pb-6.75'>HELP</h3>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Customer Service</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">My Account</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Find a Store</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Legal & Privacy</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Contact</a>
            <a className='font-jost font-normal text-[14px] leading-10 text-primary-black relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' href="">Gift Card</a>
          </div>
          {/* SUBSCRIBE div */}
          <div className='flex flex-col w-82.5'>
            <h3 className='font-jost font-medium text-[18px] text-primary-black pb-6.75'>SUBSCRIBE</h3>
            <p className='font-jost font-normal text-[14px] text-primary-black'>Be the first to get the latest news about trends,</p>
            <p className='font-jost pb-3.75 font-normal text-[14px] text-primary-black'>promotions, and much more!</p>
            {/* input div  */}
            <div className='bg-white flex items-center justify-between pr-5 pl-5.25 pt-4.25 pb-3.5'>
              <form action="">
                  <input type="email" placeholder='Your email address' className='bg-white outline-none border-none font-jost font-normal text-primary-black text-[14px] leading-6 placeholder:text-primary-black'/>
              </form>
              <button type="submit" className='font-jost font-medium text-sm leading-6 text-primary-black'>JOIN</button>
            </div>
            <p className='font-jost font-medium text-[15px] pt-10.25 pb-2.75 text-primary-black'>Secure payments</p>
            <img src={SecurePaymentsImage} alt="" />
          </div>
        </div>

        {/* light line divider */}
        <div className='pt-22 pb-8.5'>
          <div className='max-w-full bg-[#CFCDCD] p-px'></div>
        </div>

        {/* End Text  */}
        <div className='pb-7 flex justify-between'>
          <div className='flex gap-2 items-center'>
            <h3 className='font-jost font-normal text-sm leading-6 text-primary-black flex items-center'>
              ©2026 Uomo | 
            </h3>
            <a href="https://github.com/saiful-global">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="black"/>
              </svg>
            </a>
              <a className='font-jost font-normal text-sm leading-6 text-secondColor hover:text-primary-black' href="https://github.com/saiful-global">
              github.com/saiful-global
              </a>
          </div>
          <div className='flex items-center'>
            <h4 className='font-jost font-normal text-sm leading-6 text-secondColor pr-6.75'>Language</h4>
            <h4 className='font-jost font-normal text-sm leading-6 text-primary-black pr-4'>United Kingdom  |  English</h4>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.49932 3.36078C7.22726 3.08872 6.77274 3.08872 6.49999 3.36078L0.206656 9.638C-0.0688853 9.91355 -0.0688853 10.3604 0.206656 10.6352C0.482197 10.9108 0.929749 10.9108 1.20529 10.6352L6.99997 4.85667L12.794 10.6359C13.0702 10.9115 13.517 10.9115 13.7933 10.6359C14.0688 10.3604 14.0688 9.91355 13.7933 9.6387L7.49932 3.36078Z" fill="black"/>
            </svg>
            <h4 className='font-jost font-normal text-sm leading-6 text-secondColor pr-5.75 pl-8'>Currency</h4>
            <h4 className='font-jost font-normal text-sm leading-6 text-primary-black pr-2.5'>$ USD</h4>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.49932 3.36078C7.22726 3.08872 6.77274 3.08872 6.49999 3.36078L0.206656 9.638C-0.0688853 9.91355 -0.0688853 10.3604 0.206656 10.6352C0.482197 10.9108 0.929749 10.9108 1.20529 10.6352L6.99997 4.85667L12.794 10.6359C13.0702 10.9115 13.517 10.9115 13.7933 10.6359C14.0688 10.3604 14.0688 9.91355 13.7933 9.6387L7.49932 3.36078Z" fill="black"/>
            </svg>
          </div>
        </div>
      </Container>
    </footer>
    </>
  )
}

export default Footer