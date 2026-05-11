import React, {useState } from 'react';
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const SortAndView = ({setView}) => {

  const [open, setOpen] = useState(false);
  const [filterModal,setFilterModal] = useState(false);

  // button active state 
  const [active, setActive] = useState(4);
  
  let viewProduct = [2,3,4]
  const handleView =(view)=>{
    setView(view)
  }

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
            <div className="absolute z-10 mt-2 w-40 bg-white border border-[#E4E4E4] rounded shadow-2xs cursor-pointer">
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
      <div className="font-jost font-medium text-sm leading-6 text-primary-black uppercase flex items-center relative after:absolute after:top-0 after:-right-5.75 after:h-5.5 after:w-0.5 after:bg-[#E4E4E4] after:content-[''] pl-7.5">
          <h2>VIEW</h2>
          {viewProduct.map((item)=>(
            <button key={item} onClick={()=>{handleView(item); setActive(item)}} className={`pl-2.75 ${active === item ? "relative after:content-[''] after:w-2 after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:right-0" : "text-secondColor cursor-pointer"} `}>{item}</button>
          ))}
      </div>

      {/* Filter text */}
      <div onClick={()=>setFilterModal(!filterModal)} className='pl-7.5'>
         <h4 className="font-jost font-medium text-sm leading-6 text-primary-black uppercase flex items-center gap-2.5 cursor-pointer">
          <IoFilter />
          FILTER
        </h4>
      </div>
    </div>

    {/* filter absolute div */}
      <div className={`h-screen ${filterModal? "w-105": "w-0"} bg-primary-white top-0 right-0 fixed z-50 duration-300`}>
        <div className='flex justify-between bg-[#FAF9F8] px-10 py-8.25'>
          <h3 className='font-jost font-medium text-base text-primary-black'>FILTER BY</h3>
          <IoMdClose onClick={()=>setFilterModal(false)} className='text-[21px] cursor-pointer' />
        </div>
      </div>
    </>
  );
}

export default SortAndView;
