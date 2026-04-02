import React from 'react'
import { Link } from 'react-router'
import Image from '../../Common/Image'

const Card = ({item}) => {
  return (
    <>
    <div key={item.id} className={`w-full h-full relative ${item.id == 1 && "col-span-2 row-span-2"}  ${item.id == 2 && "col-span-2 row-span-1"}`}>
        <Image className="h-full w-full" src={item.Image} alt={item.name} />
        <div className='absolute bottom-10 left-10'>
        {item.id !== 4 && <h4 className='font-jost text-primary-black text-sm font-normal leading-6 '>HOT LIST</h4>}
        <h2 className='text-[24px] font-jost font-medium'><span className='font-bold'>{item.name}</span> {item.id === 4 ? "CARDS" : "COLLECTION"}</h2>
        {item.id === 4 && <p className="font-jost text-primary-black text-sm font-normal leading-6 mb-4 mt-2 pr-19">Surprise someone with the gift they really want.</p>}
        <Link className='font-jost text-primary-black text-sm font-medium leading-6 relative after:content-[""] after:w-0 hover:after:w-[40%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' to={item.link}>{item.id === 4 ? "DISCOVER MORE" : "SHOP NOW"}</Link>
        </div>
    </div>
    </>
  )
}

export default Card