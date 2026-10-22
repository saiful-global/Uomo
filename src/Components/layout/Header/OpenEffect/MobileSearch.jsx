import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

// Search box + live results for the mobile menu (MobileNab).
// When the box is empty it shows `children` (the normal menu list).
export default function MobileSearch({ onNavigate = () => {}, children }) {
  const [query, setQuery] = useState('')
  // data keeps the term it belongs to, so old results never show for a new term
  const [data, setData] = useState({ term: '', items: [] })
  const term = query.trim()

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

  const handleResultClick = () => {
    setQuery('')
    onNavigate()
  }

  return (
    <>
      {/* search box */}
      <div className="relative mb-4.25 mx-3.75 mt-5.25">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-bg-footer rounded-[3px] pt-4.25 pb-3.5 pl-4.25 pr-12 outline-none focus:border-black text-base font-jost font-normal leading-6"
        />
        {term ? (
          <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z" fill="#222222"/>
              <path d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z" fill="#222222"/>
            </svg>
          </button>
        ) : (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.92682 0C3.55609 0 0 3.55609 0 7.92682C0 12.2978 3.55609 15.8536 7.92682 15.8536C12.2978 15.8536 15.8536 12.2978 15.8536 7.92682C15.8536 3.55609 12.2978 0 7.92682 0ZM7.92682 14.3903C4.36293 14.3903 1.46341 11.4907 1.46341 7.92685C1.46341 4.36296 4.36293 1.46341 7.92682 1.46341C11.4907 1.46341 14.3902 4.36293 14.3902 7.92682C14.3902 11.4907 11.4907 14.3903 7.92682 14.3903Z" fill="#222222"/>
              <path d="M17.7856 16.751L13.5905 12.5558C13.3046 12.27 12.8417 12.27 12.5558 12.5558C12.27 12.8414 12.27 13.3049 12.5558 13.5905L16.7509 17.7856C16.8939 17.9285 17.081 18 17.2683 18C17.4553 18 17.6427 17.9285 17.7856 17.7856C18.0715 17.5 18.0715 17.0366 17.7856 16.751Z" fill="#222222"/>
            </svg>
          </span>
        )}
      </div>

      {term ? (
        data.term === term && (
          data.items.length > 0 ? (
            // list scrolls inside the menu so it never goes under the bottom block
            <ul className="mx-3.75 min-h-40 max-h-[calc(100dvh-23rem)] overflow-y-auto">
              {data.items.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/shop/${p.id}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-4 py-3 border-b border-bg-footer"
                  >
                    <div className="w-16 h-16 shrink-0 bg-[#E5E5E5] overflow-hidden">
                      <img src={p.thumbnail} alt={p.title} loading="lazy" className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-jost text-xs leading-5 text-secondColor capitalize">
                        {p.category?.replace(/-/g, ' ')}
                      </p>
                      <h3 className="font-jost text-sm leading-6 text-primary-black line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="font-jost text-sm leading-6 text-primary-black">
                        ${p.price}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mx-3.75 font-jost text-sm leading-6 text-secondColor">No products found.</p>
          )
        )
      ) : (
        children
      )}
    </>
  )
}
