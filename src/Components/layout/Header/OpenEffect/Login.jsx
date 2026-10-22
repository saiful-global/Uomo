import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [loginModal, setLoginModal] = useState(false);
  const navigate = useNavigate();
  const loginRef = useRef(null);

  const closeModal = () => {
    setLoginModal(false);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <li ref={loginRef}>
      <button
        type="button"
        onClick={() => setLoginModal(!loginModal)}
        aria-label="Login"
      >
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g clipPath="url(#clip0_6_29)">
            <path
              d="M10.0175 11.2652C3.99775 11.2652 0.682495 14.108 0.682495 19.2701C0.682495 19.6732 1.00982 20 1.41369 20H18.6212C19.0251 20 19.3524 19.6732 19.3524 19.2701C19.3524 14.1083 16.0372 11.2652 10.0175 11.2652ZM2.17149 18.5402C2.4591 14.6805 5.09505 12.7251 10.0175 12.7251C14.9399 12.7251 17.5759 14.6805 17.8637 18.5402H2.17149Z"
              fill="#222222"
            />
            <path
              d="M10.0174 0C7.25222 0 5.16711 2.12336 5.16711 4.93895C5.16711 7.83699 7.34292 10.1944 10.0174 10.1944C12.6918 10.1944 14.8676 7.83699 14.8676 4.93918C14.8676 2.12336 12.7825 0 10.0174 0ZM10.0174 8.7348C8.14917 8.7348 6.6295 7.03211 6.6295 4.93918C6.6295 2.92313 8.05436 1.45984 10.0174 1.45984C11.949 1.45984 13.4053 2.95547 13.4053 4.93918C13.4053 7.03211 11.8856 8.7348 10.0174 8.7348Z"
              fill="#222222"
            />
          </g>
          <defs>
            <clipPath id="clip0_6_29">
              <rect width="20.0348" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      {loginModal && (
        <div
          onClick={closeModal}
          className="hidden md:block fixed inset-0 z-40 bg-black/40"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-screen bg-primary-white overflow-y-auto scroll-smooth duration-300 ${
          loginModal
            ? "w-full sm:w-105"
            : "w-0"
        }`}
      >
        <div className="sticky top-0 z-10 flex justify-between bg-[#FAF9F8] px-5 py-6 sm:px-7.5 sm:py-8.25 md:px-10">
          <h3 className="font-jost font-medium text-base text-primary-black">
            LOGIN
          </h3>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close login"
          >
            <IoMdClose className="text-[21px] cursor-pointer" />
          </button>
        </div>

        <form
            onSubmit={(e) => {
              e.preventDefault();
              closeModal();
              navigate("/my-account");
            }}
            className="px-5 sm:px-7.5 md:px-10 mx-auto pt-7.75 pb-8"
          >
            <div className="relative mb-7.5">
              <input
                id="login-username"
                type="text"
                placeholder=" "
                className="peer w-full border border-bg-footer pt-4.25 pb-3.5 px-4.25 outline-none focus:border-black text-sm font-jost font-normal leading-6"
              />
              <label
                htmlFor="login-username"
                className="absolute left-4.25 top-1/2 -translate-y-1/2 font-jost font-normal text-sm leading-6 text-secondColor transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:left-4 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-black peer-focus:bg-primary-white peer-focus:px-1 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary-black peer-not-placeholder-shown:bg-primary-white peer-not-placeholder-shown:px-1"
              >
                Username or email address *
              </label>
            </div>

            <div className="relative mb-4.25">
              <input
                id="login-password"
                type="password"
                placeholder=" "
                className="peer w-full border border-bg-footer pt-4.25 pb-3.5 px-4.25 outline-none focus:border-black text-sm font-jost font-normal leading-6"
              />
              <label
                htmlFor="login-password"
                className="absolute left-4.25 top-1/2 -translate-y-1/2 font-jost font-normal text-sm leading-6 text-secondColor transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:left-4 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-black peer-focus:bg-primary-white peer-focus:px-1 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary-black peer-not-placeholder-shown:bg-primary-white peer-not-placeholder-shown:px-1"
              >
                Password *
              </label>
            </div>

            <div className="flex flex-col gap-3 pb-6.5 sm:flex-row sm:justify-between sm:items-center">
              <label className="flex items-center gap-2.5 cursor-pointer font-jost font-normal text-sm leading-6 text-primary-black">
                <input
                  type="checkbox"
                  className="w-4.25 h-4.25 accent-black border-bg-footer"
                />
                <span>Remember me</span>
              </label>

              <span className="font-jost font-normal text-sm leading-6 text-primary-black underline cursor-pointer">
                Lost password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-black text-primary-white font-jost font-medium text-sm uppercase leading-6 pt-5.5 pb-3.5 cursor-pointer"
            >
              LOG IN
            </button>

            <p className="text-center font-jost font-normal text-sm leading-6 text-secondColor pt-6">
              No account yet?{" "}
              <Link
                to="/login-register"
                onClick={closeModal}
                className="text-primary-black underline cursor-pointer"
              >
                Create Account
              </Link>
            </p>
        </form>
      </div>
    </li>
  );
};

export default Login;
