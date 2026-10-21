import { useState } from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
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
  { label: "Facebook", href: "https://www.facebook.com", Icon: FaFacebookF, hover: "hover:text-blue-500" },
  { label: "X (Twitter)", href: "https://x.com", Icon: FaXTwitter, hover: "hover:text-black" },
  { label: "Instagram", href: "https://www.instagram.com", Icon: FaInstagram, hover: "hover:text-pink-600" },
  { label: "YouTube", href: "https://www.youtube.com", Icon: FaYoutube, hover: "hover:text-red-600" },
  { label: "Pinterest", href: "https://www.pinterest.com", Icon: FaPinterest, hover: "hover:text-red-600" },
];

const HEADING = "font-jost font-medium text-[18px] text-primary-black pb-2.5 md:pb-6.75";
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

const Chevron = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7.49932 3.36078C7.22726 3.08872 6.77274 3.08872 6.49999 3.36078L0.206656 9.638C-0.0688853 9.91355 -0.0688853 10.3604 0.206656 10.6352C0.482197 10.9108 0.929749 10.9108 1.20529 10.6352L6.99997 4.85667L12.794 10.6359C13.0702 10.9115 13.517 10.9115 13.7933 10.6359C14.0688 10.3604 14.0688 9.91355 13.7933 9.6387L7.49932 3.36078Z" fill="black" />
  </svg>
);

// Language / Currency row (label, value, chevron)
const Selector = ({ label, value, title, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <h4 className="w-21.25 shrink-0 md:w-auto md:mr-6.75 font-jost font-normal text-sm leading-6 text-secondColor">
      {label}
    </h4>
    <h4
      title={title}
      className="cursor-pointer mr-3 font-jost font-normal text-sm leading-6 text-primary-black md:text-secondColor md:hover:text-primary-black"
    >
      {value}
    </h4>
    <Chevron />
  </div>
);

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
        {/* Container has no side padding from md up, so add it here until 1470px */}
        <div className="md:px-7.5 min-[1470px]:px-0">
          {/* Phone: 2 columns (brand, company+shop, help, subscribe stacked).
              md: brand + subscribe on top, 3 link columns below.
              xl: everything in one row. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-12.5 md:grid-cols-6 md:gap-y-15 xl:grid-cols-[auto_auto_auto_auto_330px] xl:justify-between xl:gap-x-8 xl:gap-y-0">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 md:col-start-1 md:row-start-1 xl:col-span-1 xl:col-start-1">
              <Link to="/">
                <Image className="pb-7.25 md:pb-11.25" src="/images/logo.png" alt="Uomo" />
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

              {/* Social icons */}
              <div className="pt-6.75 md:pt-11.75 flex gap-9">
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

            {/* Subscribe */}
            <div className="col-span-2 md:col-span-3 md:col-start-4 md:row-start-1 xl:col-span-1 xl:col-start-5 flex flex-col w-full md:max-w-82.5">
              <h3 className="font-jost font-medium text-[18px] text-primary-black pb-6.75">
                SUBSCRIBE
              </h3>
              <p className="font-jost font-normal text-[14px] leading-6 text-primary-black pb-3.75">
                Be the first to get the latest news about trends, promotions, and much more!
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
                  className="font-jost font-medium text-sm leading-6 text-primary-black cursor-pointer"
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

          {/* Divider */}
          <div className="pt-12.5 md:pt-22 pb-6.75 md:pb-8.5">
            <div className="h-0.5 bg-[#CFCDCD]" />
          </div>

          {/* Bottom bar (extra bottom space on phones for the fixed mobile menu) */}
          <div className="pb-20.75 md:pb-7 flex flex-col gap-y-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-jost font-normal text-sm leading-6 text-primary-black">
                ©2026 Uomo |
              </h3>
              <a
                href="https://github.com/saiful-global"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="black" />
                </svg>
              </a>
              <a
                href="https://github.com/saiful-global"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost font-normal text-sm leading-6 text-black hover:text-red-600"
              >
                github.com/saiful-global
              </a>
            </div>

            <div className="flex flex-col gap-y-3 md:flex-row md:flex-wrap md:items-center md:gap-y-2">
              <Selector label="Language" value="United Kingdom  |  English" title="Only English is available" />
              <Selector label="Currency" value="$ USD" title="Only $USD is available" className="md:ml-8" />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
