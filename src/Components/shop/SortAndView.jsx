import React, {useEffect, useState, useRef } from 'react';
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Range,getTrackBackground } from "react-range";

const SortAndView = ({setView}) => {

  const [open, setOpen] = useState(false);
  const [filterModal,setFilterModal] = useState(false);
  const [values, setValues] = React.useState([10,70]);
  // button active state 
  const [active, setActive] = useState(4);

  let viewProduct = [2,3,4]
  const handleView =(view)=>{
    setView(view)
  }

  //useEffect of filterModal 
  let filterRef = useRef()
  useEffect(()=>{
  const handleClick = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setFilterModal(false);
    }
  };
    document.addEventListener("mousedown", handleClick);
     return () => document.removeEventListener("mousedown", handleClick);
  },[]);
  

  //price range for text
  const MIN = 29;
  const MAX = 1000;
  // convert range to price
  const getPrice = (val) => {
  return Math.round(MIN + (val / 100) * (MAX - MIN));
  };
  
  return (
    <>
    <div className='flex justify-between w-full md:w-auto gap-7.5'>
      {/* Button & Dropdown  */}
      <div className="relative inline-block">
        {/* DEFAULT SORTING Button */}
        <button onClick={() => setOpen(!open)} className="font-jost font-medium text-sm leading-6 text-primary-black uppercase border-b-2 flex items-center gap-2.5 md:relative md:after:absolute md:after:top-0 md:after:-right-7.5 md:after:h-5.5 md:after:w-0.5 md:after:bg-bg-footer md:after:content-[''] ">
          DEFAULT SORTING
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.64332 5.84071C4.83765 6.05309 5.16231 6.05309 5.35713 5.84071L9.85239 0.940372C10.0492 0.725269 10.0492 0.376431 9.85239 0.161873C9.65557 -0.0532297 9.33589 -0.0532297 9.13908 0.161873L5 4.67294L0.861423 0.161327C0.664109 -0.0537755 0.344926 -0.0537755 0.147611 0.161327C-0.0492049 0.376429 -0.0492049 0.725268 0.147611 0.939826L4.64332 5.84071Z" fill="#222222"/>
          </svg>
        </button>
        {/* Dropdown */}
        {open && (
            <div className="absolute z-10 mt-2 w-40 bg-white border border-bg-footer rounded shadow-2xs cursor-pointer">
            <ul>
              <li className="px-4 py-2 hover:bg-primary-black font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                Popularity
              </li>
              <li className="px-4 py-2 hover:bg-primary-black font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                  Average rating
              </li>
              <li className="px-4 py-2 hover:bg-primary-black font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                Newness
              </li>
              <li className="px-4 py-2 hover:bg-primary-black font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                Price: low to high
              </li>
              <li className="px-4 py-2 hover:bg-primary-black font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                Price: high to low
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* View 1 2 3  */}
      <div className='hidden md:block'>
        <div className="font-jost font-medium text-sm leading-6 text-primary-black uppercase flex items-center relative after:absolute after:top-0 after:-right-5.75 after:h-5.5 after:w-0.5 after:bg-bg-footer after:content-[''] pl-7.5">
            <h2>VIEW</h2>
            {viewProduct.map((item)=>(
              <button key={item} onClick={()=>{handleView(item); setActive(item)}} className={`pl-2.75 ${active === item ? "relative after:content-[''] after:w-2 after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:right-0" : "text-secondColor cursor-pointer"} `}>{item}</button>
            ))}
        </div>
      </div>

        {/* Filter section  */}
      <div ref={filterRef}>
        {/* Filter text */}
        <div className='md:pl-7.5'>
          <h4 onClick={() => setFilterModal(!filterModal)} className="font-jost font-medium text-sm leading-6 text-primary-black uppercase flex items-center gap-2.5 cursor-pointer">
            <IoFilter />
            FILTER
          </h4>
        </div>
      {/* filter absolute div */}

      {/* overlay for screen when filterModal open  */}
      {filterModal && (
        <div onClick={() => setFilterModal(false)} className=" hidden md:block duration-300 transition fixed inset-0 bg-black/40 z-40" />
      )}
        <div className={`h-screen ${filterModal? "w-full md:w-105": "w-0"} bg-primary-white top-0 right-0 fixed z-50 duration-300 overflow-y-auto scroll-smooth`}>
          <div className='flex justify-between bg-[#FAF9F8] px-10 py-8.25'>
            <h3 className='font-jost font-medium text-base text-primary-black'>FILTER BY</h3>
            <IoMdClose onClick={()=>setFilterModal(false)} className='text-[21px] cursor-pointer' />
          </div>
          <div className='pl-8.5 pr-10 md:px-10 mx-auto pt-9.5'>
            {/* PRODUCT CATEGORIES  */}
            <div className='pb-9'>
              <div className='flex justify-between pb-3.25'>
                <h2 className='font-jost font-medium text-[18px] text-primary-black'>PRODUCT CATEGORIES</h2>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.35668 0.159286C5.16235 -0.053094 4.83769 -0.0530941 4.64287 0.159286L0.147611 5.05963C-0.0492049 5.27473 -0.049205 5.62357 0.147611 5.83813C0.344427 6.05323 0.664108 6.05323 0.860924 5.83813L5 1.32706L9.13858 5.83867C9.33589 6.05378 9.65507 6.05378 9.85239 5.83867C10.0492 5.62357 10.0492 5.27473 9.85239 5.06018L5.35668 0.159286Z" fill="#222222"/>
                </svg>
              </div>
              {/* List  */}
              <div className='flex gap-19.5'>
                <div>
                  <ul className='font-jost font-normal text-sm leading-7.5 text-primary-black cursor-pointer'>
                    <li>Dresses</li>
                    <li>Sweatshirts</li>
                    <li>Jackets</li>
                    <li>Jeans</li>
                    <li>Men</li>
                  </ul>
                </div>
                <div>
                  <ul className='font-jost font-normal text-sm leading-7.5 text-primary-black cursor-pointer'>
                    <li>Shorts</li>
                    <li>Swimwear</li>
                    <li>T-Shirts & Tops</li>
                    <li>Trousers</li>
                    <li>Jumpers & Cardigans</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* COLOR  */}
            <div className='pb-10'>
              <div className='flex justify-between pb-5.75'>
                <h2 className='font-jost font-medium text-[18px] text-primary-black'>COLOR</h2>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.35668 0.159286C5.16235 -0.053094 4.83769 -0.0530941 4.64287 0.159286L0.147611 5.05963C-0.0492049 5.27473 -0.049205 5.62357 0.147611 5.83813C0.344427 6.05323 0.664108 6.05323 0.860924 5.83813L5 1.32706L9.13858 5.83867C9.33589 6.05378 9.65507 6.05378 9.85239 5.83867C10.0492 5.62357 10.0492 5.27473 9.85239 5.06018L5.35668 0.159286Z" fill="#222222"/>
                </svg>
              </div>
              <div>
                <div className='flex gap-6.25 pb-6.5 cursor-pointer'>
                  <div className='w-4 h-4 bg-[#0A2472] rounded-full'></div>
                  <div className='w-4 h-4 bg-[#D7BB4F] rounded-full'></div>
                  <div className='w-4 h-4 bg-[#282828] rounded-full'></div>
                  <div className='w-4 h-4 bg-[#B1D6E8] rounded-full outline-2 outline-black outline-offset-6'></div>
                  <div className='w-4 h-4 bg-[#9C7539] rounded-full'></div>
                  <div className='w-4 h-4 bg-[#D29B48] rounded-full'></div>
                </div>
                <div className='flex gap-6.25 cursor-pointer'>
                  <div className='w-4 h-4 bg-[#E6AE95] rounded-full'></div>
                  <div className='w-4 h-4 bg-[#BABABA] rounded-full'></div>
                  <div className='w-4 h-4 bg-[#D76B67] rounded-full'></div>
                  <div className='w-4 h-4 bg-[#BFDCC4] rounded-full'></div>
                </div>
              </div>
            </div>

            {/* SIZES  */}
            <div className='pb-10'>
              <div className='flex justify-between pb-5.75'>
                <h2 className='font-jost font-medium text-[18px] text-primary-black'>SIZES</h2>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.35668 0.159286C5.16235 -0.053094 4.83769 -0.0530941 4.64287 0.159286L0.147611 5.05963C-0.0492049 5.27473 -0.049205 5.62357 0.147611 5.83813C0.344427 6.05323 0.664108 6.05323 0.860924 5.83813L5 1.32706L9.13858 5.83867C9.33589 6.05378 9.65507 6.05378 9.85239 5.83867C10.0492 5.62357 10.0492 5.27473 9.85239 5.06018L5.35668 0.159286Z" fill="#222222"/>
                </svg>
              </div>
              <div className='font-jost font-normal text-sm text-primary-black flex gap-4 pb-3.75 cursor-pointer'>
                <div className='border border-bg-footer w-14.5 h-8.75 text-center leading-7.5'>XS</div>
                <div className='border border-bg-footer w-14.5 h-8.75 text-center leading-7.5'>S</div>
                <div className='border border-bg-footer w-14.5 h-8.75 text-center leading-7.5'>M</div>
                <div className='border border-bg-footer w-14.5 h-8.75 text-center leading-7.5'>L</div>
              </div>
              <div className='font-jost font-normal text-sm text-primary-black flex gap-4 cursor-pointer'>
                <div className='border border-bg-footer w-14.5 h-8.75 text-center leading-7.5'>XL</div>
                <div className='border border-bg-footer w-14.5 h-8.75 text-center leading-7.5'>XXL</div>
              </div>
            </div>

            {/* BRANDS  */}
            <div className="pb-10">
              {/* Header Section*/}
              <div className='flex justify-between items-center pb-4'>
                <h2 className='font-jost font-medium text-[18px] text-primary-black uppercase'>BRANDS</h2>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.35668 0.159286C5.16235 -0.053094 4.83769 -0.0530941 4.64287 0.159286L0.147611 5.05963C-0.0492049 5.27473 -0.049205 5.62357 0.147611 5.83813C0.344427 6.05323 0.664108 6.05323 0.860924 5.83813L5 1.32706L9.13858 5.83867C9.33589 6.05378 9.65507 6.05378 9.85239 5.83867C10.0492 5.62357 10.0492 5.27473 9.85239 5.06018L5.35668 0.159286Z" fill="#222222"/>
                </svg>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4.75">
                <input type="text" placeholder="Search" className="w-full border border-bg-footer pt-4.25 pb-3.5 px-4.25 outline-none focus:border-black text-sm font-jost font-normal leading-6" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_135_986)">
                  <path d="M7.04606 0C3.16097 0 0 3.16097 0 7.04606C0 10.9314 3.16097 14.0921 7.04606 14.0921C10.9314 14.0921 14.0921 10.9314 14.0921 7.04606C14.0921 3.16097 10.9314 0 7.04606 0ZM7.04606 12.7913C3.87816 12.7913 1.30081 10.214 1.30081 7.04609C1.30081 3.87819 3.87816 1.30081 7.04606 1.30081C10.214 1.30081 12.7913 3.87816 12.7913 7.04606C12.7913 10.214 10.214 12.7913 7.04606 12.7913Z" fill="#767676"/>
                  <path d="M15.8094 14.8897L12.0804 11.1607C11.8263 10.9066 11.4148 10.9066 11.1607 11.1607C10.9066 11.4146 10.9066 11.8265 11.1607 12.0804L14.8897 15.8094C15.0168 15.9364 15.1831 16 15.3496 16C15.5159 16 15.6824 15.9364 15.8094 15.8094C16.0635 15.5555 16.0635 15.1436 15.8094 14.8897Z" fill="#767676"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_135_986">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </span>
              </div>

              {/* Brand List */}
              <div>
                {[
                  { name: "Adidas", count: 2 },
                  { name: "Balmain", count: 7 },
                  { name: "Balenciaga", count: 10 },
                  { name: "Burberry", count: 39 },
                  { name: "Kenzo", count: 95 },
                  { name: "Givenchy", count: 1092 },
                  { name: "Zara", count: 48 },
                ].map((brand) => (
                  <div key={brand.name} className="flex justify-between items-center font-jost font-normal text-sm text-primary-black">
                    <label className="flex items-center gap-3 cursor-pointer leading-10">
                      <input type="checkbox" className="w-4.25 h-4.25 accent-black border-bg-footer" />
                      <span>{brand.name}</span>
                    </label>
                    <span className="text-secondColor leading-10">{brand.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* price & range  */}
            <div className='pb-5'>
              <div className='flex justify-between pb-4.5'>
                <h2 className='font-jost font-medium text-[18px] text-primary-black'>PRICE</h2>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.35668 0.159286C5.16235 -0.053094 4.83769 -0.0530941 4.64287 0.159286L0.147611 5.05963C-0.0492049 5.27473 -0.049205 5.62357 0.147611 5.83813C0.344427 6.05323 0.664108 6.05323 0.860924 5.83813L5 1.32706L9.13858 5.83867C9.33589 6.05378 9.65507 6.05378 9.85239 5.83867C10.0492 5.62357 10.0492 5.27473 9.85239 5.06018L5.35668 0.159286Z" fill="#222222"/>
                </svg>
              </div>
              <Range
                label="Select your value"
                step={0.1}
                min={0}
                max={100}
                values={values}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      height: "6px",
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "6px",
                        width: "100%",
                        borderRadius: "10px",
                        background: getTrackBackground({
                          values,
                          colors: ["#E4E4E4", "#000000", "#E4E4E4"], // left, selected, right
                          min: 0,
                          max: 100
                        }),
                        alignSelf: "center"
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    key={props.key}
                    style={{
                      ...props.style,
                      height: "18px",
                      width: "18px",
                      backgroundColor: "white",
                      borderRadius:"50%",
                      border: "2px solid black",
                    }}
                  />
                )}
              />
              {/* price text  */}
              <div className="flex justify-between pt-1.25 font-jost font-normal text-sm leading-10 text-secondColor ">
                <p>
                  Min Price: <span className='text-primary-black'>${getPrice(values[0])}</span>
                </p>
                <p>
                  Max Price: <span className='text-primary-black'>${getPrice(values[1])}</span>
                </p>
              </div>
            </div>

            {/* Tags  */}
            <div class="flex flex-wrap gap-4.25 items-center pb-50 font-jost font-normal text-[11px]">

              <div class="flex items-center gap-2.5 bg-[#EEEEEE] px-3.75 cursor-pointer hover:bg-primary-black hover:text-white leading-7.5">
                <span>✕</span>
                <span>Blues</span>
              </div>

              <div class="flex items-center gap-2.5 bg-[#EEEEEE] px-3.75 cursor-pointer hover:bg-primary-black hover:text-white leading-7.5">
                <span>✕</span>
                <span>Max Price: $493</span>
              </div>

              <div class="flex items-center gap-2.5 bg-[#EEEEEE] px-3.75 cursor-pointer hover:bg-primary-black hover:text-white leading-7.5">
                <span>✕</span>
                <span>Zara</span>
              </div>

              <div class="flex items-center gap-2.5 bg-[#EEEEEE] px-3.75 cursor-pointer hover:bg-primary-black hover:text-white leading-7.5">
                <span>✕</span>
                <span>Reset Filter</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SortAndView;
