import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsVisible(window.scrollY > 300);
    });
  }, []);

  return isVisible ? (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-0 right-0 bg-[#EEEEEE] group p-3 hover:bg-primary-black transition-all">
        <svg className='fill-primary-black group-hover:fill-primary-white' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.49932 3.36078C7.22726 3.08872 6.77274 3.08872 6.49999 3.36078L0.206656 9.638C-0.0688853 9.91355 -0.0688853 10.3604 0.206656 10.6352C0.482197 10.9108 0.929749 10.9108 1.20529 10.6352L6.99997 4.85667L12.794 10.6359C13.0702 10.9115 13.517 10.9115 13.7933 10.6359C14.0688 10.3604 14.0688 9.91355 13.7933 9.6387L7.49932 3.36078Z"/>
        </svg>
    </button>
  ) : null;
};

export default ScrollToTop;