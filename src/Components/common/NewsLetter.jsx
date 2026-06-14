import { useState, useEffect } from "react";
import Image from "./Image";
import NewsLetterImage from "../../assets/images/NewsLatterImage.png"

function NewsLetter() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setIsOpen(false)} >
      <div className="bg-white relative rounded-sm overflow-hidden shadow-[0_10px_25px_0_rgba(34,34,34,0.05)]" onClick={(e) => e.stopPropagation()} >

        {/* Close button */}
        <button onClick={() => setIsOpen(false)} className="absolute top-7.5 right-7.5" >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z" fill="#222222"/>
          <path d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z" fill="#222222"/>
          </svg>
        </button>

        {/* Left: image, Right: form */}
        <div className="flex gap-10.25 items-center">
          <div className="w-1/2">
            <Image src={NewsLetterImage} alt="NewsLetterImage" className="w-full h-full object-cover" ></Image>
          </div>
          <div className="w-1/2 mr-9.75 max-w-92.5">
            <h2 className="font-jost font-medium text-[26px] text-primary-black">Sign Up to Our Newsletter</h2>
            <p className="font-jost font-normal text-[14px] leading-6 text-primary-black pt-3.5 pb-3.75">Be the first to get the latest news about trends, promotions, and much more!</p>
            {/* input div  */}
            <div className='bg-white border-2 border-bg-footer flex items-center justify-between pr-5 pl-5.25 pt-4.25 pb-3.5'>
              <form action="">
                  <input type="email" placeholder='Your email address' className='bg-white outline-none border-none font-jost font-normal text-primary-black text-[14px] leading-6 placeholder:text-secondColor'/>
              </form>
              <button type="submit" className='font-jost font-medium text-sm leading-6 text-primary-black'>JOIN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;