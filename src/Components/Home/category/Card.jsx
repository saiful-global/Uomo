import React from 'react'
import { Link } from 'react-router'
import Image from '../../common/Image'

// grid placement per card: md = 2-column layout, lg+ = original 4x2 layout
const SPAN_CLASSES = {
  1: "md:row-span-2 lg:col-span-2 lg:row-span-2",
  2: "lg:col-span-2 lg:row-span-1",
  4: "md:col-span-2 lg:col-span-1",
}

const Card = ({item}) => {
  return (
    <>
    {/* group + overflow-hidden: the zoomed image stays clipped inside the card */}
    <div className={`group w-full h-full relative overflow-hidden ${SPAN_CLASSES[item.id] || ""}`}>
        {/* hover zoom only on the image; the text block below is not scaled */}
        <Image className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" src={item.Image} alt={item.name} />
        <div className={` ${item.id == 4? "w-4/5": "w-1/2"} md:w-[calc(100%-3rem)] absolute bottom-7.5 left-7.5 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 xl:bottom-10 xl:left-10`}>
          {item.id !== 4 && <h4 className='font-jost text-primary-black text-sm font-normal leading-6 '>HOT LIST</h4>}
          <h2 className='text-[20px] lg:text-[20px] xl:text-[24px] font-jost font-medium'><span className='font-bold'>{item.name}</span> {item.id === 4 ? "CARDS" : "COLLECTION"}</h2>
          {item.id === 4 && <p className="font-jost text-primary-black text-sm font-normal leading-6 mb-4 mt-2 pr-19 md:pr-0 xl:pr-19">Surprise someone with the gift they really want.</p>}
          <Link className='font-jost text-primary-black text-sm font-medium leading-6 relative after:content-[""] after:w-0 hover:after:w-[60%] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300' to={item.link}>{item.id === 4 ? "DISCOVER MORE" : "SHOP NOW"}</Link>
        </div>
    </div>
    </>
  )
}

export default Card
