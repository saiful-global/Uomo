import React, { useState } from "react";
import Countdown from "react-countdown";
import { Helmet } from "react-helmet";
import Container from "../Components/ui/Container";

// Launch time is created once when the file loads (module scope, not during render).
// Demo value from Figma: 5 days, 7 hours, 9 minutes, 3 seconds from now.
// To use a real launch date, replace it with: new Date("2026-12-31T00:00:00")
const LAUNCH_DATE =
  Date.now() +
  (5 * 24 * 60 * 60 + 7 * 60 * 60 + 9 * 60 + 3) * 1000;

// Builds a zigzag polyline path (decorative zigzag lines)
const zigzag = (x0, y0, count, step = 29, h = 22) => {
  let d = `M${x0} ${y0}`;
  for (let i = 0; i < count; i++) {
    d += ` L${x0 + step * (i + 1)} ${y0 + (i % 2 === 0 ? h : 0)}`;
  }
  return d;
};

// Decorative background (Figma 62_coming_soon). One scalable SVG, no overflow.
const BackgroundShapes = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1920 960"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    <defs>
      <pattern
        id="cs-hatch"
        width="9"
        height="9"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line x1="0" y1="0" x2="0" y2="9" stroke="#E6E6E6" strokeWidth="2" />
      </pattern>
    </defs>

    {/* Big rings: bottom */}
    <circle cx="1262" cy="1040" r="445" stroke="#F5F5F5" strokeWidth="46" />
    <circle cx="1262" cy="1040" r="282" stroke="#F5F5F5" strokeWidth="71" />
    <circle cx="1262" cy="1040" r="127" stroke="#F5F5F5" strokeWidth="70" />

    {/* Big ring: top right */}
    <circle cx="1580" cy="-125" r="287" stroke="#F5F5F5" strokeWidth="85" />

    {/* Small outline circles */}
    <circle cx="189" cy="585" r="47" stroke="#EDEDED" strokeWidth="4" />
    <circle cx="1609" cy="348" r="47" stroke="#EDEDED" strokeWidth="4" />
    <circle cx="693" cy="795" r="61" stroke="#EDEDED" strokeWidth="4" />

    {/* Hatched shapes */}
    <polygon points="478,155 660,315 500,500 315,345" fill="url(#cs-hatch)" />
    <polygon points="1920,270 1845,355 1920,425" fill="url(#cs-hatch)" />
    <polygon points="0,735 50,790 0,835" fill="url(#cs-hatch)" />

    {/* Zigzag lines */}
    <path d={zigzag(1052, 478, 14)} stroke="#EDEDED" strokeWidth="3" />
    <path d={zigzag(1140, 513, 11)} stroke="#EDEDED" strokeWidth="3" />

    {/* Thin diagonal lines */}
    <g stroke="#EDEDED" strokeWidth="2">
      <line x1="0" y1="320" x2="235" y2="30" />
      <line x1="280" y1="90" x2="340" y2="0" />
      <line x1="285" y1="960" x2="470" y2="732" />
      <line x1="380" y1="960" x2="780" y2="470" />
      <line x1="1805" y1="275" x2="1920" y2="135" />
      <line x1="1700" y1="960" x2="1785" y2="828" />
      <line x1="1775" y1="960" x2="1920" y2="780" />
    </g>
  </svg>
);

// Adds a leading zero: 5 -> "05"
const pad = (n) => String(n).padStart(2, "0");

// One countdown column (number + label)
const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-start">
    <span className="font-jost text-2xl sm:text-[32px] font-light leading-8 sm:leading-10 text-primary-black">
      {pad(value)}
    </span>
    <span className="font-jost text-xs sm:text-base font-semibold uppercase leading-6 text-secondColor">
      {label}
    </span>
  </div>
);

const Colon = () => (
  <span
    aria-hidden="true"
    className="font-jost text-2xl sm:text-[32px] font-light leading-8 sm:leading-10 text-primary-black"
  >
    :
  </span>
);

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  // No backend: we only show a thank-you message, nothing is stored
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail("");
  };

  return (
    <>
      <Helmet>
        <title>Coming Soon | Uomo</title>
      </Helmet>

      {/* mt-15 md:mt-20 keeps the content under the fixed header */}
      <section className="relative overflow-hidden mt-15 md:mt-20 min-h-150 md:min-h-200 xl:min-h-220 flex items-center justify-center">
        <BackgroundShapes />

        <Container className="relative z-10 flex flex-col items-center text-center py-16 px-4">
          <h1 className="font-jost font-bold uppercase text-primary-black leading-none text-[40px] sm:text-[64px] md:text-[84px] lg:text-[104px]">
            Coming Soon
          </h1>

          <p className="font-jost text-primary-black text-sm leading-6 max-w-115 mt-5 md:mt-6">
            Sorry, we couldn't find the page you where looking for. We suggest
            that you return to home page.
          </p>

          {/* Countdown */}
          <Countdown
            date={LAUNCH_DATE}
            renderer={({ days, hours, minutes, seconds }) => (
              <div className="flex items-start justify-center gap-4 sm:gap-7 mt-8 md:mt-10">
                <TimeUnit value={days} label="Days" />
                <Colon />
                <TimeUnit value={hours} label="Hours" />
                <Colon />
                <TimeUnit value={minutes} label="Mins" />
                <Colon />
                <TimeUnit value={seconds} label="Sec" />
              </div>
            )}
          />

          {/* Email form */}
          {joined ? (
            <p className="font-jost text-primary-black text-base mt-10 md:mt-13 h-15 flex items-center">
              Thank you! We will let you know when we launch.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-stretch gap-3 sm:gap-5 w-full max-w-180 mt-10 md:mt-13"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                className="flex-1 min-w-0 h-15 px-5 border border-bg-footer bg-primary-white font-jost text-sm text-primary-black placeholder:text-secondColor outline-none focus:border-primary-black duration-300"
              />
              <button
                type="submit"
                className="w-24 sm:w-37.5 h-15 bg-primary-black text-primary-white font-jost text-sm font-medium uppercase hover:bg-thirdColor duration-300 cursor-pointer"
              >
                Join
              </button>
            </form>
          )}
        </Container>
      </section>
    </>
  );
};

export default ComingSoon;
