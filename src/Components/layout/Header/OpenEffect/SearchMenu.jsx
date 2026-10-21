import { Link } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
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
  const [query, setQuery] = useState('')
  // data keeps the term it belongs to, so old results never show for a new term
  const [data, setData] = useState({ term: '', items: [] })
  const term = query.trim()

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  // Live search from dummyjson (5 results, 300ms debounce)
  useEffect(() => {
    if (!term) return
    const controller = new AbortController()
    const timer = setTimeout(() => {
      axios
        .get('https://dummyjson.com/products/search', {
          params: { q: term, limit: 5 },
          signal: controller.signal,
        })
        .then((res) => setData({ term, items: res.data.products }))
        .catch(() => {}) // aborted or failed requests are ignored
    }, 300)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [term])

  const clearSearch = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  const handleResultClick = () => {
    setQuery('')
    onClose()
  }

  return (
    // Visible from md (768px) because the desktop header starts at md.
    // max-h + overflow-y-auto keeps the panel inside short laptop screens.
    <div className={`absolute left-0 top-full w-full max-h-[calc(100dvh-5rem)] overflow-y-auto bg-white border-t border-bg-footer shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hidden md:block z-50 ${ isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3 pointer-events-none' }`} >
      <Container className="pt-10 pb-12 xl:pt-15.5 xl:pb-18.25">
        {/* Container has no side padding from md up, so add it here until 1470px */}
        <div className="md:px-7.5 min-[1470px]:px-0">
          <p className="font-jost text-sm font-medium leading-6 tracking-widest uppercase text-secondColor mb-5 xl:mb-7.25">
            What are you looking for?
          </p>

          <div className={`relative border-b-2 pb-2.5 mb-6.75 ${term ? 'border-primary-black' : 'border-secondColor'}`}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS"
              className="w-full bg-transparent uppercase font-jost font-medium text-sm leading-6 text-primary-black placeholder:opacity-70 placeholder:text-secondColor focus:outline-none pr-8"
            />

            {term ? (
              // Clear button (X) while there is text
              <button type="button" aria-label="Clear search" onClick={clearSearch} className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z" fill="#222222"/>
                  <path d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z" fill="#222222"/>
                </svg>
              </button>
            ) : (
              <button type="button" aria-label="Search" className="absolute right-0 top-1/2 -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_117_1636)">
                <path d="M8.80758 0C3.95121 0 0 3.95121 0 8.80758C0 13.6642 3.95121 17.6152 8.80758 17.6152C13.6642 17.6152 17.6152 13.6642 17.6152 8.80758C17.6152 3.95121 13.6642 0 8.80758 0ZM8.80758 15.9892C4.84769 15.9892 1.62602 12.7675 1.62602 8.80762C1.62602 4.84773 4.84769 1.62602 8.80758 1.62602C12.7675 1.62602 15.9891 4.84769 15.9891 8.80758C15.9891 12.7675 12.7675 15.9892 8.80758 15.9892Z" fill="#767676"/>
                <path d="M19.762 18.6121L15.1007 13.9509C14.7831 13.6332 14.2687 13.6332 13.9511 13.9509C13.6335 14.2682 13.6335 14.7831 13.9511 15.1005L18.6124 19.7617C18.7711 19.9205 18.979 19.9999 19.1872 19.9999C19.395 19.9999 19.6031 19.9205 19.762 19.7617C20.0796 19.4444 20.0796 18.9295 19.762 18.6121Z" fill="#767676"/>
                </g>
                <defs>
                <clipPath id="clip0_117_1636">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </button>
            )}
          </div>

          {term ? (
            // Search results (Figma: open_search_products)
            data.term === term && (
              data.items.length > 0 ? (
                <ul className="grid grid-cols-3 xl:grid-cols-5 gap-x-4 lg:gap-x-7 gap-y-8">
                  {data.items.map((p) => (
                    <li key={p.id} className="min-w-0">
                      <Link to={`/shop/${p.id}`} onClick={handleResultClick} className="block">
                        <div className="aspect-square bg-[#E5E5E5] overflow-hidden">
                          <img src={p.thumbnail} alt={p.title} loading="lazy" className="w-full h-full object-contain" />
                        </div>
                        <p className="mt-4 xl:mt-6 font-jost text-[13px] leading-6 text-secondColor capitalize">
                          {p.category?.replace(/-/g, ' ')}
                        </p>
                        <h3 className="font-jost text-base leading-6 text-primary-black line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="font-jost text-base leading-6 text-primary-black">
                          ${p.price}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-jost text-sm leading-6 text-secondColor">No products found.</p>
              )
            )
          ) : (
            <>
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
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
