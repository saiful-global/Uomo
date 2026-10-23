import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import Image from '../../common/Image';
import { navitems } from '../../../api/navbarData';
import { SHOP_TABS, SHOP_MAIN, SUB_LINKS, PAGES_LINKS } from '../../../api/menuData';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { FiUser, FiChevronDown } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaPinterest } from 'react-icons/fa'
import { FaXTwitter,FaYoutube } from "react-icons/fa6";
import ShoppingBag from './OpenEffect/ShoppingBag'
import MobileSearch from './OpenEffect/MobileSearch'
import { useCartCount } from '../../../api/cartStore'

const ROW = 'font-jost font-medium text-base leading-11.25 w-full flex justify-between items-center text-primary-black cursor-pointer'
const COLLECTION_LINKS = SUB_LINKS.map((name) => ({ name, url: '/shop' }))

// Display-only options (copied from Footer.jsx). Clicking an option just closes the list, nothing changes.
const LANGUAGES = [
    { label: "English", sub: "English", active: true },
    { label: "中文", sub: "Mandarin Chinese" },
    { label: "हिन्दी", sub: "Hindi" },
    { label: "Español", sub: "Spanish" },
    { label: "Français", sub: "French" },
    { label: "العربية", sub: "Arabic" },
    { label: "বাংলা", sub: "Bengali" },
    { label: "Português", sub: "Portuguese" },
    { label: "Русский", sub: "Russian" },
    { label: "اردو", sub: "Urdu" },
]

const CURRENCIES = [
    { label: "$ USD", sub: "US Dollar", active: true },
    { label: "€ EUR", sub: "Euro" },
    { label: "¥ JPY", sub: "Japanese Yen" },
    { label: "£ GBP", sub: "British Pound" },
    { label: "$ AUD", sub: "Australian Dollar" },
    { label: "$ CAD", sub: "Canadian Dollar" },
    { label: "CHF", sub: "Swiss Franc" },
    { label: "¥ CNY", sub: "Chinese Yuan" },
    { label: "$ HKD", sub: "Hong Kong Dollar" },
    { label: "$ NZD", sub: "New Zealand Dollar" },
]

// Language / Currency selector: list opens upward, closes on outside tap or Escape.
// Height is capped by the screen height so it never gets cut off on short phones.
const Selector = ({ label, value, options, className = '' }) => {
    const [open, setOpen] = useState(false)
    const wrapRef = useRef(null)

    useEffect(() => {
        if (!open) return
        const onOutside = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
        }
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('mousedown', onOutside)
        document.addEventListener('touchstart', onOutside)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onOutside)
            document.removeEventListener('touchstart', onOutside)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    return (
        <div ref={wrapRef} className={`relative flex items-center ${className}`}>
            <span className='w-21.25 shrink-0 font-jost font-normal text-sm leading-6 text-secondColor'>{label}</span>
            <button
                type='button'
                onClick={() => setOpen((o) => !o)}
                aria-haspopup='listbox'
                aria-expanded={open}
                className='flex items-center gap-3 cursor-pointer font-jost font-normal text-sm leading-6 text-primary-black text-left'
            >
                <span>{value}</span>
                <FiChevronDown size={18} className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <ul
                    role='listbox'
                    aria-label={label}
                    className='absolute bottom-full left-0 mb-3 z-50 w-60 max-w-full max-h-[min(18rem,50vh)] overflow-y-auto overscroll-contain bg-white border border-[#CFCDCD] shadow-lg py-1'
                >
                    {options.map((o) => (
                        <li key={o.label + o.sub} role='option' aria-selected={!!o.active}>
                            <button
                                type='button'
                                onClick={() => setOpen(false)}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left font-jost text-sm leading-5 text-primary-black cursor-pointer transition-colors duration-150 hover:bg-gray-100 ${o.active ? 'bg-gray-50 font-medium' : 'font-normal'}`}
                            >
                                <span>{o.label}</span>
                                <span className='text-xs text-secondColor'>{o.sub}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const MobileNab = () => {

    const cartItems = useCartCount()
    const { pathname } = useLocation()
    const [mobileMenu, setMobileMenu] = useState(false);
    const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);
    // Screen stack: "main" -> "shop" | "pages" | "collection"
    const [stack, setStack] = useState(["main"]);
    const [activeTab, setActiveTab] = useState(0);

    const view = stack[stack.length - 1]
    const push = (v) => setStack((s) => [...s, v])
    const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s))
    const closeMenu = () => {
        setMobileMenu(false)
        setStack(["main"])
    }

    // Tabs WOMEN / MEN / KIDS (shop screens)
    const renderTabs = () => (
        <div className='flex items-center gap-1.5 mx-3.75 pt-5 pb-3 overflow-x-auto'>
            {SHOP_TABS.map((tab, i) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`font-jost font-medium text-sm leading-6 px-4.5 py-2.5 rounded-sm cursor-pointer whitespace-nowrap shrink-0 ${activeTab === i ? 'bg-primary-black text-primary-white' : 'text-primary-black'}`}
                >
                    {tab}
                </button>
            ))}
        </div>
    )

    // Sub screen with back arrow + link list (Pages, Collection)
    const renderSub = (title, links) => (
        <div className='mx-3.75'>
            <button onClick={back} className='w-full flex items-center gap-2.5 py-3.5 border-b border-bg-footer font-jost font-medium text-base leading-6 text-primary-black cursor-pointer'>
                <MdChevronLeft size={20} />
                {title}
            </button>
            <ul className='py-2.5 px-0.75'>
                {links.map((l) => (
                    <li key={l.name}>
                        <Link to={l.url} onClick={closeMenu} className='block font-jost font-normal text-sm leading-8.75 text-primary-black'>
                            {l.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )

    // Main nav list (HOME, SHOP, ...)
    const renderMain = () => (
        <ul className='flex flex-col items-start mx-3.75'>
            {navitems?.map((item) => {
                const active = item.url === pathname
                const label = (
                    <span className={`relative inline-block ${active ? "after:content-[''] after:absolute after:left-0 after:bottom-1.5 after:w-6 after:h-0.5 after:bg-primary-black" : ''}`}>
                        {item.name}
                    </span>
                )
                // Items that open a sub screen
                const target = item.type === 'mega' ? 'shop' : item.type === 'pages-mega' ? 'pages' : (!item.url && item.type !== 'blog-mega') ? 'collection' : null
                return (
                    <li className='w-full' key={item.id}>
                        {target ? (
                            <button onClick={() => push(target)} className={ROW}>
                                {label}
                                <MdChevronRight size={20} />
                            </button>
                        ) : (
                            <Link to={item.url || '/blog'} onClick={closeMenu} className={ROW}>
                                {label}
                                <MdChevronRight size={20} />
                            </Link>
                        )}
                    </li>
                )
            })}
        </ul>
    )

    // Big shop list (WOMEN, MAN, ...)
    const renderShop = () => (
        <ul className='flex flex-col items-start mx-3.75'>
            {SHOP_MAIN.map((item, i) => {
                const active = item.arrow && i === activeTab
                const cls = `${ROW} ${item.red ? 'text-redColor' : ''}`
                const label = (
                    <span className={`relative inline-block ${active ? "after:content-[''] after:absolute after:left-0 after:bottom-1.5 after:w-6 after:h-0.5 after:bg-primary-black" : ''}`}>
                        {item.name}
                    </span>
                )
                return (
                    <li className='w-full' key={item.id}>
                        {item.sub ? (
                            <button onClick={() => push('collection')} className={cls}>
                                {label}
                                <MdChevronRight size={20} />
                            </button>
                        ) : (
                            <Link to='/shop' onClick={closeMenu} className={cls}>
                                {label}
                                {item.arrow && <MdChevronRight size={20} />}
                            </Link>
                        )}
                    </li>
                )
            })}
        </ul>
    )

    const showBottom = view === 'main' || view === 'pages'

  return (
        <div className='mobile_nav flex justify-between mx-3.75 items-center md:hidden'>
            {/* Menu Bar icon with toogle */}
            {mobileMenu ?
            (<button onClick={closeMenu} aria-label="Close menu" className="p-2 -m-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z" fill="#222222"/>
                <path d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z" fill="#222222"/>
                </svg>
            </button>)
            :
            (<button onClick={()=>setMobileMenu(true)} aria-label="Open menu" className="p-2 -m-2">
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="25.0435" height="2" fill="#222222"/>
                <rect y="8" width="20.0348" height="2" fill="#222222"/>
                <rect y="16" width="25.0435" height="2" fill="#222222"/>
                </svg>
            </button>)
            }
            {/* Logo  */}
            <Link to="/" onClick={closeMenu}>
                <Image className="w-28" src="/images/logo.png" alt="logo" ></Image>
            </Link>
            {/* Cart */}
            <div className='relative'>
                <button onClick={() => setIsShoppingBagOpen(true)} aria-label="Cart" className="p-2 -m-2">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6869 4.6875H15.3021C14.9912 2.05164 12.74 0 10.0174 0C7.29479 0 5.04353 2.05164 4.73264 4.6875H2.3478C1.91556 4.6875 1.56519 5.03727 1.56519 5.46875V19.2188C1.56519 19.6502 1.91556 20 2.3478 20H17.6869C18.1192 20 18.4696 19.6502 18.4696 19.2188V5.46875C18.4696 5.03727 18.1192 4.6875 17.6869 4.6875ZM10.0174 1.5625C11.8754 1.5625 13.4225 2.91621 13.7214 4.6875H6.31332C6.61228 2.91621 8.1593 1.5625 10.0174 1.5625ZM16.9043 18.4375H3.13041V6.25H4.69563V8.59375C4.69563 9.02523 5.046 9.375 5.47824 9.375C5.91047 9.375 6.26084 9.02523 6.26084 8.59375V6.25H13.7739V8.59375C13.7739 9.02523 14.1243 9.375 14.5565 9.375C14.9887 9.375 15.3391 9.02523 15.3391 8.59375V6.25H16.9043V18.4375Z" fill="#222222"/>
                    </svg>
                </button>
                <span className='font-jost bg-thirdColor px-1.25 py-px text-primary-white rounded-full font-medium text-[10px] absolute bottom-0 left-3 '>{cartItems}</span>
            </div>

            {/* Menu panel: one scroller, so short screens / landscape never hide the content */}
            <div className={`${mobileMenu? "w-full": "w-0"} bottom-0 bg-white fixed top-15 left-0 border-t border-bg-footer z-50 duration-400 transition-all overflow-x-hidden overflow-y-auto overscroll-contain`}>
                <div className='min-h-full flex flex-col'>
                    <div>
                        {view === 'main' && (
                            <MobileSearch onNavigate={closeMenu}>
                                {renderMain()}
                            </MobileSearch>
                        )}
                        {view === 'pages' && (
                            <MobileSearch onNavigate={closeMenu}>
                                {renderSub('PAGES', PAGES_LINKS)}
                            </MobileSearch>
                        )}
                        {view === 'shop' && (
                            <>
                                {renderTabs()}
                                {renderShop()}
                            </>
                        )}
                        {view === 'collection' && (
                            <>
                                {renderTabs()}
                                {renderSub('COLLECTION', COLLECTION_LINKS)}
                            </>
                        )}
                    </div>

                    {/* menu's bottom part  */}
                    {showBottom && (
                    <div className='mt-auto border-t border-bg-footer w-full'>
                        <div className='mx-3.75 pb-[calc(20px+env(safe-area-inset-bottom,0px))]'>
                            <Link to="/my-account" onClick={closeMenu} className='pt-7.25 font-jost font-medium text-sm leading-6 flex w-fit items-center gap-3.25 pb-4.25 text-primary-black'>
                                <FiUser size={18} />
                                <h3>MY ACCOUNT</h3>
                            </Link>
                            <Selector label="Language" value="United Kingdom  |  English" options={LANGUAGES} />
                            <Selector label="Currency" value="$ USD" options={CURRENCIES} className="pt-4" />
                            {/* Social Icons  */}
                            <div className='pt-6 flex gap-9'>
                                <a href="https://www.facebook.com/global.saiful" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <FaFacebookF className='text-primary-black' />
                                </a>
                                <a href="#" aria-label="X">
                                    <FaXTwitter className='text-primary-black' />
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <FaInstagram className='text-primary-black' />
                                </a>
                                <a href="#" aria-label="YouTube">
                                    <FaYoutube className='text-primary-black' />
                                </a>
                                <a href="#" aria-label="Pinterest">
                                    <FaPinterest className='text-primary-black' />
                                </a>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <ShoppingBag isOpen={isShoppingBagOpen} onClose={() => setIsShoppingBagOpen(false)} />
        </div>
  )
}

export default MobileNab
