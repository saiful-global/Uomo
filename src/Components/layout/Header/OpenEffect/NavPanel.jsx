import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { SHOP_TABS, SHOP_MAIN, SUB_LINKS } from '../../../../api/menuData'
import Image from '../../../common/Image'
import panelImage from '../../../../assets/images/g11.jpg'

// Hamburger panel (Figma: open_navs), responsive from 320px to 1920px+
const NavPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeMain, setActiveMain] = useState(1)

  // Escape closes the panel, body scroll is locked while it is open
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-60 transition-[visibility] duration-500 ${isOpen ? 'visible' : 'invisible pointer-events-none'}`}
    >
      {/* Overlay (left image on large screens, dark overlay below lg). Click closes */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 lg:bg-transparent transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image src={panelImage} alt="Menu" className="hidden lg:block w-1/2 h-full object-cover" />
      </div>

      {/* Panel (slides in from the right) */}
      <aside
        className={`absolute top-0 right-0 h-full w-full max-w-full md:w-[85%] lg:w-1/2 bg-white flex flex-col transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Top bar: tabs + close */}
        <div className="shrink-0 bg-[#F9F8F6] h-17 px-3 sm:px-5 lg:px-10.25 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {SHOP_TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`font-jost font-medium text-sm leading-6 px-3 sm:px-4.5 py-2.5 rounded-sm cursor-pointer whitespace-nowrap ${activeTab === i ? 'bg-primary-black text-primary-white' : 'text-primary-black'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button onClick={onClose} aria-label="Close menu" className="shrink-0 p-3 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z" fill="#222222" />
              <path d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z" fill="#222222" />
            </svg>
          </button>
        </div>

        {/* Scroll area */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 lg:px-10.25 pt-7.5 pb-[calc(30px+env(safe-area-inset-bottom,0px))]">
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-x-6 md:gap-x-8 lg:gap-x-11 gap-y-8">
            {/* Big list */}
            <ul>
              {SHOP_MAIN.map((item) => (
                <li key={item.id} onMouseEnter={() => setActiveMain(item.id)} className="flex items-center gap-4">
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className={`font-jost font-medium text-lg sm:text-xl xl:text-2xl leading-12.5 sm:shrink-0 ${item.red ? 'text-redColor' : 'text-primary-black'}`}
                  >
                    {item.name}
                  </Link>
                  <span className={`hidden sm:block flex-1 h-px bg-primary-black ${activeMain === item.id && item.arrow ? 'opacity-100' : 'opacity-0'}`} />
                </li>
              ))}
            </ul>

            {/* Sub list */}
            <ul>
              {SUB_LINKS.map((name) => (
                <li key={name}>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="font-jost font-normal text-sm leading-8.75 text-primary-black hover:underline"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default NavPanel
