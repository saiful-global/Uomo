import { useState, useEffect } from "react";

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-75 bg-primary-black p-7.5">
      <p className="font-jost font-normal text-[13px] text-white leading-6">In order to provide you a personalized shopping experience, our site uses cookies. By continuing to use this site, you are agreeing to our cookie policy.</p>
      <button onClick={handleAccept} className="w-full bg-[#5C5C5C] leading-6 font-jost font-medium text-sm text-white pt-2.5 pb-1.5 mt-3.25" >
        ACCEPT
      </button>
    </div>
  );
}

export default CookieConsent;