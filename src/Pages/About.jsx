import React from 'react'
import Container from '../Components/ui/Container'
import TrustBadges from '../Components/Home/TrustBadges'

// Gray placeholder artwork (same shapes as Figma: circle + triangle, the overlap is light).
// All coordinates are in the hero coordinate system (1163 x 454); the square image
// only changes the viewBox so it shows a different crop of the same art.
const Art = ({ viewBox, className, id }) => (
  <svg
    viewBox={viewBox}
    preserveAspectRatio="xMidYMid slice"
    className={className}
    role="img"
    aria-label="Uomo artwork"
  >
    <defs>
      <clipPath id={id}>
        <circle cx="473" cy="253" r="225" />
      </clipPath>
    </defs>
    {/* light background (big enough for every crop) */}
    <rect x="-1000" y="-1000" width="4000" height="4000" fill="#E5E5E5" />
    <circle cx="473" cy="253" r="225" fill="#B9B9B9" />
    <polygon points="483,251 698,-119 914,251" fill="#B9B9B9" />
    {/* overlap of triangle and circle stays light */}
    <polygon points="483,251 698,-119 914,251" fill="#E5E5E5" clipPath={`url(#${id})`} />
  </svg>
)

const BRANDS = ['MANGO', 'ZARA', 'Reebok', 'asos', 'stradivarius', 'adidas', 'Bershka']

const About = () => {
  return (
    <section className="mt-15 md:mt-20 pt-8 md:pt-19 font-jost text-primary-black">
      <Container>
        <div className="md:px-7.5 min-[1470px]:px-0">
          {/* Page title */}
          <h1 className="xl:ml-60 text-3xl md:text-[40px] md:leading-12 font-bold uppercase">
            About Uomo
          </h1>

          {/* Hero artwork */}
          <Art
            id="about-clip-hero"
            viewBox="0 0 1163 454"
            className="mt-6 md:mt-10 w-full h-52 md:h-auto md:aspect-[1410/550]"
          />

          {/* Our story */}
          <div className="xl:ml-60 max-w-240 mt-10 md:mt-15">
            <h2 className="text-xl md:text-2xl font-medium uppercase">Our Story</h2>
            <p className="mt-6 text-base font-medium leading-7.5">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p className="mt-6 text-sm leading-7.5">
              Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights
              seasons. Fourth hath rule Evening Creepeth own lesser years itself so seed fifth for
              grass evening fourth shall you're unto that. Had. Female replenish for yielding so saw
              all one to yielding grass you'll air sea it, open waters subdue, hath. Brought second
              Made. Be. Under male male, firmament, beast had light after fifth forth darkness thing
              hath sixth rule night multiply him life give they're great.
            </p>

            {/* Mission + Vision */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-12">
              <div>
                <h3 className="text-base font-medium">Our Mission</h3>
                <p className="mt-4 text-sm leading-7.5 max-w-106">
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium">Our Vision</h3>
                <p className="mt-4 text-sm leading-7.5 max-w-106">
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>

          {/* The company: image + text */}
          <div className="mt-8 xl:pl-30 grid grid-cols-1 md:grid-cols-[minmax(0,570px)_1fr] gap-8 md:gap-11 items-center">
            <Art
              id="about-clip-side"
              viewBox="342 -84 470 537"
              className="w-full h-auto aspect-570/650"
            />
            <div className="max-w-137.5">
              <h3 className="text-sm font-normal uppercase text-secondColor">The Company</h3>
              <p className="mt-4 text-sm leading-7.5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien dignissim a
                elementum. Sociis metus, hendrerit mauris id in. Quis sit sit ultrices tincidunt
                euismod luctus diam. Turpis sodales orci etiam phasellus lacus id leo. Amet turpis
                nunc, nulla massa est viverra interdum. Praesent auctor nulla morbi non posuere
                mattis. Arcu eu id maecenas cras. Eget fames tincidunt leo, sed vitae, pretium
                interdum. Non massa, imperdiet nunc sit sapien. Tempor lectus ornare quis mi vel.
              </p>
              <p className="mt-6 text-sm leading-7.5">
                Nibh euismod donec elit posuere lobortis consequat faucibus aliquam metus. Ornare
                consequat, vulputate sit maecenas mauris urna sed fringilla. Urna fermentum iaculis
                pharetra, maecenas dui nullam nullam rhoncus. Facilisis quis vulputate sem gravida
                lacus, justo placerat.
              </p>
            </div>
          </div>

          {/* Trust badges (reused from Home) */}
          <div className="mt-20 md:mt-28">
            <TrustBadges />
          </div>

          {/* Brand row (text wordmarks, no logo files) */}
          <div className="mt-16 md:mt-20 mb-16 md:mb-24 flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-5 text-[#B0B0B0]">
            {BRANDS.map((brand) => (
              <span key={brand} className="text-2xl md:text-3xl font-light tracking-wide">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
