import React, { useState } from 'react';

const SortAndView = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
    <div className='flex gap-7.5'>
      {/* Button & Dropdown  */}
      <div className="relative inline-block">
        {/* Button */}
        <button onClick={() => setOpen(!open)} className="font-jost font-medium text-sm leading-6 text-primary-black uppercase border-b-2 flex items-center gap-2.5 relative after:absolute after:top-0 after:-right-7.5 after:h-5.5 after:w-0.5 after:bg-[#E4E4E4] after:content-[''] ">
          DEFAULT SORTING
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.64332 5.84071C4.83765 6.05309 5.16231 6.05309 5.35713 5.84071L9.85239 0.940372C10.0492 0.725269 10.0492 0.376431 9.85239 0.161873C9.65557 -0.0532297 9.33589 -0.0532297 9.13908 0.161873L5 4.67294L0.861423 0.161327C0.664109 -0.0537755 0.344926 -0.0537755 0.147611 0.161327C-0.0492049 0.376429 -0.0492049 0.725268 0.147611 0.939826L4.64332 5.84071Z" fill="#222222"/>
          </svg>
        </button>
        {/* Dropdown */}
        {open && (
            <div className="absolute mt-2 w-40 bg-white border border-[#E4E4E4] rounded shadow-2xs">
            <ul>
              <li className="px-4 py-2 hover:bg-primary-black cursor-pointer font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                Popularity
              </li>
              <li className="px-4 py-2 hover:bg-primary-black cursor-pointer font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                  Average rating
              </li>
              <li className="px-4 py-2 hover:bg-primary-black cursor-pointer font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                Newness
              </li>
              <li className="px-4 py-2 hover:bg-primary-black cursor-pointer font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                Price: low to high
              </li>
              <li className="px-4 py-2 hover:bg-primary-black cursor-pointer font-jost font-medium text-sm leading-6 text-primary-black hover:text-white">
                Price: high to low
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* View 1 2 3  */}
      <div>
        <ul className="font-jost font-medium text-sm leading-6 text-primary-black uppercase flex items-center gap-2.75 relative after:absolute after:top-0 after:-right-5.75 after:h-5.5 after:w-0.5 after:bg-[#E4E4E4] after:content-[''] pl-7.5">
          VIEW
          <li>2</li>
          <li className='font-jost text-base font-medium text-primary-black relative after:content-[""] after:w-full after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300;'>3</li>
          <li>4</li>
        </ul>
      </div>

      {/* Filter  */}
      <div className='pl-7.5'>
         <h4 className="font-jost font-medium text-sm leading-6 text-primary-black uppercase flex items-center gap-2.5">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.44444 9.33333H8.55556V7.77778H5.44444V9.33333ZM0 0V1.55556H14V0H0ZM2.33333 5.44444H11.6667V3.88889H2.33333V5.44444Z" fill="black"/>
          </svg>
          FILTER
        </h4>
      </div>
    </div>
    </>
  );
}

export default SortAndView;