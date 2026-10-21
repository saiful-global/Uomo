import { useState, useEffect } from "react";

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-3.75 left-3.75 right-3.75 z-50 max-w-none bg-primary-black p-5 sm:bottom-5 sm:left-5 sm:right-5 sm:p-6 md:left-auto md:right-5 md:max-w-75 md:p-7.5">
      <p className="font-jost font-normal text-[13px] text-white leading-6">
        In order to provide you a personalized shopping experience, our site
        uses cookies. By continuing to use this site, you are agreeing to our
        cookie policy.
      </p>

      <button
        type="button"
        onClick={handleAccept}
        className="w-full bg-[#5C5C5C] leading-6 font-jost font-medium text-sm text-white pt-2.5 pb-1.5 mt-3.25"
      >
        ACCEPT
      </button>
    </div>
  );
}

export default CookieConsent;
