import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaPinterest, FaGithub } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import Container from "../ui/Container";
import Image from "../common/Image";
import SecurePaymentsImage from "../../assets/images/SecurePaymentsImage.png";

// Link lists. Careers, Affiliates and Gift Card have no page yet,
// so they point to /coming-soon. Change the "to" value when a page exists.
const COMPANY_LINKS = [
  { label: "About Us", to: "/About" },
  { label: "Careers", to: "/coming-soon" },
  { label: "Affiliates", to: "/coming-soon" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

const SHOP_LINKS = [
  { label: "New Arrivals", to: "/shop" },
  { label: "Accessories", to: "/shop" },
  { label: "Men", to: "/shop" },
  { label: "Women", to: "/shop" },
  { label: "Shop All", to: "/shop" },
];

const HELP_LINKS = [
  { label: "Customer Service", to: "/faq" },
  { label: "My Account", to: "/my-account" },
  { label: "Find a Store", to: "/store-locator" },
  { label: "Legal & Privacy", to: "/terms" },
  { label: "Contact", to: "/contact" },
  { label: "Gift Card", to: "/coming-soon" },
];

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/global.saiful", Icon: FaFacebookF, hover: "hover:text-blue-500" },
  { label: "X (Twitter)", href: "https://x.com", Icon: FaXTwitter, hover: "hover:text-black" },
  { label: "Instagram", href: "https://www.instagram.com", Icon: FaInstagram, hover: "hover:text-pink-600" },
  { label: "YouTube", href: "https://www.youtube.com", Icon: FaYoutube, hover: "hover:text-red-600" },
  { label: "Pinterest", href: "https://www.pinterest.com", Icon: FaPinterest, hover: "hover:text-red-600" },
];

const HEADING =
  "font-jost font-medium text-[18px] text-primary-black pb-2.5 md:pb-6.75";
const LINK =
  'font-jost font-normal text-sm leading-10 text-primary-black relative after:content-[""] after:w-0 after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300 hover:after:w-[40%]';

const FooterColumn = ({ title, links, className }) => (
  <div className={`flex flex-col ${className}`}>
    <h3 className={HEADING}>{title}</h3>
    {links.map((l) => (
      <Link key={l.label} to={l.to} className={LINK}>
        {l.label}
      </Link>
    ))}
  </div>
);

// Display-only options. Clicking an option just closes the menu, nothing changes.
const LANGUAGES = [
  { label: "English", sub: "English", active: true },
  { label: "中文", sub: "Mandarin Chinese" },
  { label: "हिन्दी", sub: "Hindi" },
  { label: "Español", sub: "Spanish" },
  { label: "Français", sub: "French" },
  { label: "العربية", sub: "Arabic" },
  { label: "বাংলা", sub: "Bengali" },
  { label: "Português", sub: "Portuguese" },
  { label: "Русский", sub: "Russian" },
  { label: "اردو", sub: "Urdu" },
];

const CURRENCIES = [
  { label: "$ USD", sub: "US Dollar", active: true },
  { label: "€ EUR", sub: "Euro" },
  { label: "¥ JPY", sub: "Japanese Yen" },
  { label: "£ GBP", sub: "British Pound" },
  { label: "$ AUD", sub: "Australian Dollar" },
  { label: "$ CAD", sub: "Canadian Dollar" },
  { label: "CHF", sub: "Swiss Franc" },
  { label: "¥ CNY", sub: "Chinese Yuan" },
  { label: "$ HKD", sub: "Hong Kong Dollar" },
  { label: "$ NZD", sub: "New Zealand Dollar" },
];

const Chevron = ({ open }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path
      d="M7.49932 3.36078C7.22726 3.08872 6.77274 3.08872 6.49999 3.36078L0.206656 9.638C-0.0688853 9.91355 -0.0688853 10.3604 0.206656 10.6352C0.482197 10.9108 0.929749 10.9108 1.20529 10.6352L6.99997 4.85667L12.794 10.6359C13.0702 10.9115 13.517 10.9115 13.7933 10.6359C14.0688 10.3604 14.0688 9.91355 13.7933 9.6387L7.49932 3.36078Z"
      fill="black"
    />
  </svg>
);

// Language / Currency selector: opens upward, closes on outside click or Escape
const Selector = ({ label, value, options, className = "" }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={`relative flex items-center ${className}`}>
      <span className="w-21.25 shrink-0 md:w-auto md:mr-6.75 font-jost font-normal text-sm leading-6 text-secondColor">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-3 cursor-pointer font-jost font-normal text-sm leading-6 text-primary-black md:text-secondColor md:hover:text-primary-black"
      >
        <span className="text-left">{value}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute bottom-full left-0 md:left-auto md:right-0 mb-3 z-50 w-60 max-w-[calc(100vw-2rem)] max-h-72 overflow-y-auto bg-white border border-[#CFCDCD] shadow-lg py-1"
        >
          {options.map((o) => (
            <li key={o.label + o.sub} role="option" aria-selected={!!o.active}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left font-jost text-sm leading-5 text-primary-black cursor-pointer transition-colors duration-150 hover:bg-gray-100 ${
                  o.active ? "bg-gray-50 font-medium" : "font-normal"
                }`}
              >
                <span>{o.label}</span>
                <span className="text-xs text-secondColor">{o.sub}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Footer = () => {
  const [joined, setJoined] = useState(false);

  // Nothing is stored, only a thank-you text is shown
  const handleJoin = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setJoined(true);
  };

  return (
    <footer className="bg-bg-footer pt-12.25 md:pt-25">
      <Container>
        <div className="md:px-7.5 min-[1470px]:px-0">
          <div className="grid grid-cols-2 gap-x-4 gap-y-12.5 md:grid-cols-6 md:gap-y-15 xl:grid-cols-[auto_auto_auto_auto_330px] xl:justify-between xl:gap-x-8 xl:gap-y-0">
            <div className="col-span-2 md:col-span-3 md:col-start-1 md:row-start-1 xl:col-span-1 xl:col-start-1">
              <Link to="/">
                <Image
                  className="pb-7.25 md:pb-11.25"
                  src="/images/logo.svg"
                  alt="Uomo"
                />
              </Link>

              <p className="font-jost font-normal text-sm leading-6 text-primary-black">
                1418 River Drive, Suite 35 Cottonhall, CA 9622
              </p>
              <p className="font-jost font-normal text-sm leading-6 text-primary-black pb-9.25">
                United States
              </p>
              <p className="font-jost font-medium text-sm leading-6 text-primary-black">
                sale@uomo.com
              </p>
              <p className="font-jost font-medium text-sm leading-6 text-primary-black">
                +1 246-345-0695
              </p>

              <div className="pt-6.75 md:pt-11.75 flex flex-wrap gap-7 md:gap-9">
                {SOCIALS.map(({ label, href, Icon, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon className={`${hover} cursor-pointer`} />
                  </a>
                ))}
              </div>
            </div>

            <FooterColumn
              title="COMPANY"
              links={COMPANY_LINKS}
              className="md:col-span-2 md:col-start-1 md:row-start-2 xl:col-span-1 xl:col-start-2 xl:row-start-1"
            />

            <FooterColumn
              title="SHOP"
              links={SHOP_LINKS}
              className="md:col-span-2 md:col-start-3 md:row-start-2 xl:col-span-1 xl:col-start-3 xl:row-start-1"
            />

            <FooterColumn
              title="HELP"
              links={HELP_LINKS}
              className="col-span-2 md:col-span-2 md:col-start-5 md:row-start-2 xl:col-span-1 xl:col-start-4 xl:row-start-1"
            />

            <div className="col-span-2 md:col-span-3 md:col-start-4 md:row-start-1 xl:col-span-1 xl:col-start-5 flex flex-col w-full md:max-w-82.5">
              <h3 className="font-jost font-medium text-[18px] text-primary-black pb-6.75">
                SUBSCRIBE
              </h3>

              <p className="font-jost font-normal text-[14px] leading-6 text-primary-black pb-3.75">
                Be the first to get the latest news about trends, promotions,
                and much more!
              </p>

              <form
                onSubmit={handleJoin}
                className="bg-white flex items-center justify-between gap-x-3 pr-5 pl-5.25 pt-4.25 pb-3.5"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="flex-1 min-w-0 bg-white outline-none border-none font-jost font-normal text-primary-black text-[14px] leading-6 placeholder:text-primary-black"
                />
                <button
                  type="submit"
                  className="shrink-0 font-jost font-medium text-sm leading-6 text-primary-black cursor-pointer"
                >
                  JOIN
                </button>
              </form>

              {joined && (
                <p className="pt-2 font-jost text-sm leading-6 text-primary-black">
                  Thank you for subscribing!
                </p>
              )}

              <p className="font-jost font-medium text-[15px] pt-10.25 pb-2.75 text-primary-black">
                Secure payments
              </p>
              <img
                src={SecurePaymentsImage}
                alt="Accepted payments: Discover, Mastercard, PayPal, Skrill, Visa"
                className="max-w-full h-auto self-start"
              />
            </div>
          </div>

          <div className="pt-12.5 md:pt-22 pb-6.75 md:pb-8.5">
            <div className="h-0.5 bg-[#CFCDCD]" />
          </div>

          <div className="pb-20.75 md:pb-7 flex flex-col gap-y-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-jost font-normal text-sm leading-6 text-primary-black">
                ©2026 Uomo |
              </h3>

              <a
                href="https://github.com/saiful-global"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={16} className="text-black" aria-hidden="true" />
              </a>

              <a
                href="https://github.com/saiful-global"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost font-normal text-sm leading-6 text-black hover:text-red-600 break-all"
              >
                github.com/saiful-global
              </a>
            </div>

            <div className="flex flex-col gap-y-3 md:flex-row md:flex-wrap md:items-center md:gap-y-2">
              <Selector
                label="Language"
                value="United Kingdom  |  English"
                options={LANGUAGES}
              />
              <Selector
                label="Currency"
                value="$ USD"
                options={CURRENCIES}
                className="md:ml-8"
              />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
