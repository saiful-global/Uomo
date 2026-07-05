import { Link } from 'react-router'
import { useEffect, useRef } from 'react'
import Container from '../../../ui/Container'

const quickLinks = [
  { id: 1, name: 'New Arrivals', url: '/shop' },
  { id: 2, name: 'Dresses', url: '/shop' },
  { id: 3, name: 'Accessories', url: '/shop' },
  { id: 4, name: 'Footwear', url: '/shop' },
  { id: 5, name: 'Sweatshirt', url: '/shop' },
]

export default function SearchMenu({ isOpen, onClose = () => {} }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  return (
    <div className={`absolute left-0 top-full w-full bg-white border-t border-bg-footer shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hidden lg:block z-50 ${ isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3 pointer-events-none' }`} >
      <Container className="pt-15.5 pb-18.25">
        <p className="font-jost text-sm font-medium leading-6 tracking-widest uppercase text-secondColor mb-7.25">
          What are you looking for?
        </p>

        <div className="relative border-b-2 border-secondColor pb-2.5 mb-6.75">
          <input ref={inputRef} type="text" placeholder="SEARCH PRODUCTS" className="w-full bg-transparent font-jost font-medium text-sm leading-6 tracking-wide text-primary-black placeholder:opacity-70 placeholder:text-secondColor focus:outline-none pr-8" />

          <button type="button" aria-label="Search" className="absolute right-0 top-1/2 -translate-y-1/2">
            <svg width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_search_menu)">
                <path d="M8.82291 0C3.95809 0 0 3.95121 0 8.80758C0 13.6642 3.95809 17.6152 8.82291 17.6152C13.688 17.6152 17.6458 13.6642 17.6458 8.80758C17.6458 3.95121 13.688 0 8.82291 0ZM8.82291 15.9892C4.85613 15.9892 1.62885 12.7675 1.62885 8.80762C1.62885 4.84773 4.85613 1.62602 8.82291 1.62602C12.7897 1.62602 16.017 4.84769 16.017 8.80758C16.017 12.7675 12.7897 15.9892 8.82291 15.9892Z" fill="#222222"/>
                <path d="M19.7962 18.6122L15.1268 13.9509C14.8086 13.6333 14.2934 13.6333 13.9752 13.9509C13.657 14.2683 13.657 14.7832 13.9752 15.1005L18.6446 19.7618C18.8036 19.9206 19.0119 20 19.2204 20C19.4286 20 19.6371 19.9206 19.7962 19.7618C20.1143 19.4444 20.1143 18.9295 19.7962 18.6122Z" fill="#222222"/>
              </g>
              <defs>
                <clipPath id="clip0_search_menu">
                  <rect width="20.0348" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        <h4 className="font-jost font-medium text-[14px] leading-6 mb-2.25 uppercase text-secondColor">
          Quicklinks
        </h4>
        <ul className="font-jost font-normal text-sm leading-8.75 text-primary-black">
          {quickLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.url} onClick={onClose}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}