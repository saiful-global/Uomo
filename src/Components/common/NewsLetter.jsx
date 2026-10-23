import { useState, useEffect } from "react";
import Image from "./Image";
import NewsLetterImage from "../../assets/images/NewsLatterImage.jpg";

function NewsLetter() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3.75 sm:p-5 md:p-7.5"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white relative rounded-sm overflow-hidden shadow-[0_10px_25px_0_rgba(34,34,34,0.05)] w-full max-w-145 max-h-[calc(100vh-30px)] overflow-y-auto md:max-w-180 lg:max-w-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close newsletter"
          className="absolute top-4 right-4 z-10 md:top-7.5 md:right-7.5"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z"
              fill="#222222"
            />
            <path
              d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z"
              fill="#222222"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row md:gap-6 lg:gap-10.25 items-stretch">
          <div className="w-full md:w-1/2 shrink-0">
            <Image
              src={NewsLetterImage}
              alt="NewsLetterImage"
              className="w-full h-52 sm:h-64 md:h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 mr-0 md:mr-9.75 max-w-none md:max-w-92.5 px-5 py-8 sm:px-7.5 sm:py-10 md:px-0 md:py-0 md:flex md:flex-col md:justify-center md:pr-0">
            <h2 className="font-jost font-medium text-xl sm:text-2xl md:text-[26px] text-primary-black">
              Sign Up to Our Newsletter
            </h2>

            <p className="font-jost font-normal text-[14px] leading-6 text-primary-black pt-3.5 pb-3.75">
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-white border-2 border-bg-footer flex items-center justify-between gap-3 pr-4 pl-4 pt-3.5 pb-3 md:pr-5 md:pl-5.25 md:pt-4.25 md:pb-3.5"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
                className="flex-1 min-w-0 bg-white outline-none border-none font-jost font-normal text-primary-black text-[14px] leading-6 placeholder:text-secondColor"
              />
              <button
                type="submit"
                className="shrink-0 font-jost font-medium text-sm leading-6 text-primary-black"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
