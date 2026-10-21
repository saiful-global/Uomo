import React from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet";
import Container from "../Components/ui/Container";

// Builds a zigzag polyline path (used for the decorative zigzag lines)
const zigzag = (x0, y0, count, step = 29, h = 22) => {
  let d = `M${x0} ${y0}`;
  for (let i = 0; i < count; i++) {
    d += ` L${x0 + step * (i + 1)} ${y0 + (i % 2 === 0 ? h : 0)}`;
  }
  return d;
};

// Decorative background (Figma 61_404). One SVG that scales with the section,
// so there is no horizontal overflow on any screen size.
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
        id="nf-hatch"
        width="9"
        height="9"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line x1="0" y1="0" x2="0" y2="9" stroke="#E6E6E6" strokeWidth="2" />
      </pattern>
    </defs>

    {/* Big rings: bottom right */}
    <circle cx="1330" cy="1040" r="445" stroke="#F5F5F5" strokeWidth="46" />
    <circle cx="1330" cy="1040" r="282" stroke="#F5F5F5" strokeWidth="71" />
    <circle cx="1330" cy="1040" r="127" stroke="#F5F5F5" strokeWidth="70" />

    {/* Rings: top right */}
    <circle cx="1650" cy="0" r="162" stroke="#F5F5F5" strokeWidth="85" />
    <circle cx="1650" cy="0" r="315" stroke="#F5F5F5" strokeWidth="30" />

    {/* Small outline circles */}
    <circle cx="258" cy="585" r="47" stroke="#EDEDED" strokeWidth="4" />
    <circle cx="1678" cy="348" r="47" stroke="#EDEDED" strokeWidth="4" />
    <circle cx="762" cy="795" r="61" stroke="#EDEDED" strokeWidth="4" />

    {/* Hatched shapes */}
    <polygon points="548,155 730,315 570,500 385,345" fill="url(#nf-hatch)" />
    <polygon points="0,670 120,785 0,905" fill="url(#nf-hatch)" />

    {/* Zigzag lines */}
    <path d={zigzag(1122, 478, 14)} stroke="#EDEDED" strokeWidth="3" />
    <path d={zigzag(1210, 513, 11)} stroke="#EDEDED" strokeWidth="3" />

    {/* Thin diagonal lines */}
    <g stroke="#EDEDED" strokeWidth="2">
      <line x1="40" y1="350" x2="275" y2="40" />
      <line x1="355" y1="960" x2="540" y2="732" />
      <line x1="450" y1="960" x2="850" y2="480" />
      <line x1="1875" y1="275" x2="1920" y2="215" />
      <line x1="1770" y1="960" x2="1855" y2="828" />
    </g>
  </svg>
);

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page not found | Uomo</title>
      </Helmet>

      {/* mt-15 md:mt-20 keeps the content under the fixed header */}
      <section className="relative overflow-hidden mt-15 md:mt-20 min-h-150 md:min-h-200 xl:min-h-220 flex items-center justify-center">
        <BackgroundShapes />

        <Container className="relative z-10 flex flex-col items-center text-center py-16">
          <h1 className="font-jost font-bold text-primary-black leading-none text-[56px] sm:text-[80px] md:text-[96px] xl:text-[104px] tracking-tight">
            OOPS!
          </h1>

          <h2 className="font-jost font-normal text-primary-black text-xl sm:text-2xl mt-6 md:mt-8">
            Page not found.
          </h2>

          <p className="font-jost text-primary-black text-sm leading-6 max-w-115 mt-5 md:mt-6">
            Sorry, we couldn't find the page you where looking for. We suggest
            that you return to home page.
          </p>

          <Link
            to="/"
            className="mt-8 md:mt-10 w-full max-w-85 h-15 flex items-center justify-center bg-primary-black text-primary-white font-jost text-sm font-medium uppercase hover:bg-thirdColor duration-300"
          >
            Go back
          </Link>
        </Container>
      </section>
    </>
  );
};

export default NotFound;
