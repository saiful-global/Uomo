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

// Brand logos are inline SVG components (defined at the bottom of this file)
const BRANDS = [
  { name: 'Mango', Logo: LogoMango },
  { name: 'Zara', Logo: LogoZara },
  { name: 'Reebok', Logo: LogoReebok },
  { name: 'Asos', Logo: LogoAsos },
  { name: 'Stradivarius', Logo: LogoStradivarius },
  { name: 'Adidas', Logo: LogoAdidas },
  { name: 'Bershka', Logo: LogoBershka },
]

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
          <div className="mt-8 xl:pl-30 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[570px_1fr] gap-8 md:gap-8 xl:gap-11 items-center">
            <Art
              id="about-clip-side"
              viewBox="342 -84 470 537"
              className="w-full h-auto aspect-570/650"
            />
            <div className="min-w-0 max-w-137.5">
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

          {/* Brand row */}
          <div className="mt-16 md:mt-20 mb-16 md:mb-24 flex flex-wrap items-center justify-center xl:justify-between gap-x-8 gap-y-6">
            {BRANDS.map((brand) => (
              <brand.Logo key={brand.name} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About

// ---- Brand logos (inline SVG, exported from Figma) ----
function LogoMango() {
  return (
  <svg width="120" height="20" viewBox="0 0 120 20" role="img" aria-label="Mango" className="h-auto max-w-full">
    <image width="120" height="19.2" preserveAspectRatio="none" href="data:image/png;base64,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" />
  </svg>
  )
}

function LogoZara() {
  return (
  <svg width="87" height="20" viewBox="0 0 87 20" role="img" aria-label="Zara" className="h-auto max-w-full">
    <image width="87" height="20" preserveAspectRatio="none" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAAAUCAYAAAD4BKGuAAAEqElEQVRYCb1Zy3HcRhDtRulA7IXKwFQEoiIQHYHJ4wIHURGQjsBkBDIjkHQY7JFUBCYjEJmBnYF4Wdz2qd5WD2owmMWPa6Fqa/7db3p6+jOrIiJVVd2LyHsA/6nqv+zr+Y5F5DAaPyuK4i7qSzadc+dZlt0vl8shPq31hjHFWwBc+8mqeiIi23kAfojIXZZl11P5eXq+nIP7lV8M4FtZlqe+nSqdc8eq+j0aexgrWK5T1UsAFMB5RKe3WRQF11ARLkXkUzi5LMursH17e/u6rusrVb0gHwDnzrmPZVl+CedNqc/BnXkGWZb97eu7SlWNwT2r6mghrVYrCuitiHzgQe3i09evqo994xw7Ozv7URQFDzHU6M/Gf2h5ZzzEvVqtjjoTdnRshQvg8uDgoBe0c47aQcGE39WU6wag0TBVbWlfSHRfddPoZ09vs9nM4hniBjCaxla4ZVk+8rQ9iLi00+IVC7+noigGtd0vsNN/79sicjJXkwIag1UA9CfbT1Un35YE7tOxuBuz4AGkSgBfVPV1OEY7FraH6qn5AP4aWvfS8REOupfFZrOhjW99Y3EPCpdekpFESJ22jNoe9vXVqfkAeDhfo3m/Qnu3jtD4NiYiwpFsEreq8kbPwt0rXHrd2DMzXFssFqPNAVHTZtFhqmpjc/1uxmqBnz+lrKqK0U/oJ2KH3EuOuOnE5+LuFe56ve6YgyzLzvvsc4zW7PXRcrn0se0sLYjpDrUpWACfg3lPeZ53DjcYb1X3gbuJc1uURYRGG8AfUf9XCinq620yEhGRRtOpBQCoUU0iYto7iW7IlDdsvV5fZlkG9m82G9JnTO6nPeR5fjpFKUxrm8Mw3B88QZZDuJOaS7DRqZPWc57nHeMeMovrZlZOwiSDoRuARti25kW2l0Kjw6VATCg+KrgB8I4JyBTBGu7jUJEs5LyJ9tiLOylcZjciEgfLk8wBQVCbEoIUs9kt5/JS28srT38Qbh7A4RTH69fuwm1mZTTujnAthotj2kkpLkHy9FX1NJVyUosSQj8xB+T3OKk0zWyl78weLV0eTWsO7l1xb8fmJjY9KcX1u6jrmiHcYVVV//i+sLTQLOxindnPqAegeCHb1FLn3LWqhvHzJ+fc/VgNptaq6iTclvm9izE1Fp8DTHEjYOz+c0om5hlUVfWY53mvrUvxA9D7wGKOtnVgRVG09kHeYQjG17HFYvFmjN3dJ+7GLFjAHJ445TQpxfWCZeIB4G5oMynbmzhcT3Z0GWeDdHZ1Xd8OEdg37ka4THFj5jHIeNy3LSb0ze2z4phEY4ftPbKssKE3tUITEL6I2Xra9DhKaZHms+I+cW+Fa0Z/doobHowJpvchKNzR/6W99iL2FPISkYtdTtNw3w/dNk9vDO6M3jEOg6akuFVVNRpv8eFF4t3XY+qUtpnYiR3t8vIAfAzb0DK+TdtXUjeP8Xv8lhzgjnF4Up1yDG51zt2papyJ8S+YMX/DMBbm74HcAby11zOu/cYH6w6qoMO0hYfREZhN2+IoiuJ34hSR31Jz6bD4iK6q/DunlenZ4bcyK6PNfd/w1UtV+f7AfZDfzZADH8INgA718SfIIqsni/AQyQAAAABJRU5ErkJggg==" />
  </svg>
  )
}

function LogoReebok() {
  return (
  <svg width="132" height="22" viewBox="0 0 132 22" role="img" aria-label="Reebok" className="h-auto max-w-full">
    <image width="132" height="22" preserveAspectRatio="none" href="data:image/png;base64,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" />
  </svg>
  )
}

function LogoAsos() {
  return (
  <svg width="72" height="21" viewBox="0 0 72 21" role="img" aria-label="Asos" className="h-auto max-w-full">
    <image width="72" height="21" preserveAspectRatio="none" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAVCAYAAADl/ahuAAAFoElEQVRYCaVYy3EbORBFo/ag4WXlCFaOYOUITEUg60jMYa0ILEVgKQLTEVg6ADyKisBUBJYjsDYD7WWo0/TWQ6FZQBPDoXZZxcKn0Y3GQ6M/Q2bgt1gspsx8ysxTIjpOy56YeUVEK+fcLeYWi8VnJeJ2Nps9Yc57f2ytjTKY+ZiIDrO1K2PMIxF9lfUZreguFoujvu9PieiDkhNlMPNt27aPBZMaQBci+ssYc5zLYOZnIgJvVRdScuKhiOiLMWaqaWr8RETnzPw9nyeik4ODg8eu674Q0cectqO/bJrm/Ozs7Dlfc3d3d/gKOStmvtRAQcZ6vf5mjPmQy97RnzvnLoVeAOS9x4FwsPymZe1eLQBiZljVGMCFPGZ+nEwmJwISbtwY8y2z3mJ9bQBrMMYApBvQE8DfXyMjyV06587Qt7IRwCEiKPSfwYEsZgbIGpx/mPkc4CUAz40xP2VvtDhE13UX6CdwXn0w6I4zpIs2kKfBYea/c10AKOZyXWBtIiNaUKZQAQ4z31tr57PZDG9dbgSmekVEfyihcZjedCEHoIiMnCeEgLf/p8yBt23bN977H7WDYd/JZLIUKwshQBeA+l5kSMvM74hormlE9Fb7vGRp8EH5mZ6cc28jQCEE+JHi1oGymKpsKm161wBtczih1dqmad7IoXJ6OuBdPmeMgdxCF1hb0zTTmgzwhhAAxKc95BjnXOFWhEdekIzRRpCTd/+hCPdt2+50agkkRKvfc96B/qVzDofY+iFa5pPa6cP8J5PJ8RA4wuu9XxLRqYyH2iFrxnleXl4kWkd2BBuqoV8zw9qGNV4cSJmqsM7HwnHNopj5um3bKxEy1CIVYOZfQ/R8noggb5OO5DTd/w15gZp80G9U0fMhnoM2bUQQnRuBBw7zIoQAq3tEPmWtvc/3SvlJLt9Ya2NEKiYrA8jx3g9dTsHBzADoCrpAD+ijdREGy8yFH0kMQt/ZElGRt2CxtRb5CKLU0O8IUQIOFDceQsAfCRwiGWjFLwewIFQGRBQTVEX6qsb58Ai5muiC4CC6yCL7f8J6LTJBMJw7ninMWDba0QKUGwQKfVk7eKqklAcVNOccLPfEGPNQECqDFDmjLvBJWLLJgyrrR6e0g80ZcPPOuY+IYMYYJF24yV1K5iVNLmrv/tBl4yKdc1PokqwbF1fkYWqTadd1sUKAD4LSmzyCiIqoohiLITMX+U5BTIMUfZbGGPzjLzljRMn4tGS+1sL5vuKZ5XkMxBUgJF3g0zaZ9nq9xnm3cilYE0I/LEgXee/FvGoKq7m9wcz5nHNI5ZFxx3Q+p+l+3/d77QEgjTHah8EBD/4AWNIFhfmW34z+aSAPGg2tALHrul9DZi1a7Uo4sSaEgENsLFj4svapaZp3Y3lQCAFWMWaRZwAkk110vfcowAsrtKn6LXwDEX2WWqSQkAYAZ71e342Bk5brNKAQycxjieYRKvqCSQ2SrgU4lfpK6kTFXQy3dNnUYvjGo7NiZr6x1l7nPsB7j2wVtZjOn4qd8gHktG27ZcID6T1yGaQPRfqBEoSZ523b3ovsVEN+qn1WQZkAv6ctYsiiQwjwQ/oiHjZ1SU1ZUSS1yDH0G1dLYv1yDQvcIhgD873p+/7ZWnvY933MQfQ6ZM7pYFsXJmtrBbHQ0AoIQ2fCpxVr7VJ0wUfBSv0X5WwAguAhgfnmY/30OQMOuDD5Mb5E/+mci5aZrGPLAkbk4LPKRV5k7+mbamJvEUiKPAiCk2kWPqnGjRCa1m6RIThZwhZtaALrBRysgW9EkbpnsgmWB1hCDg4mU7TclU1rlQAydMElm8KC8pXpmzRyFSgZo0wqROELVqKI974oJFE7ic9Kzhwb4VsynlQeIQAwnt2qaZqbXVEqFaLQRcvBReI7znIoq5cz5TLSmXKHHHXB086/N4H3X66XEMNWAgu6AAAAAElFTkSuQmCC" />
  </svg>
  )
}

function LogoStradivarius() {
  return (
  <svg width="123" height="31" viewBox="0 0 123 31" role="img" aria-label="Stradivarius" className="h-auto max-w-full">
    <image width="123" height="31" preserveAspectRatio="none" href="data:image/png;base64,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" />
  </svg>
  )
}

function LogoAdidas() {
  return (
  <svg width="137" height="22" viewBox="0 0 137 22" role="img" aria-label="Adidas" className="h-auto max-w-full">
    <image width="137" height="22" preserveAspectRatio="none" href="data:image/png;base64,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" />
  </svg>
  )
}

function LogoBershka() {
  return (
  <svg width="94" height="21" viewBox="0 0 94 21" role="img" aria-label="Bershka" className="h-auto max-w-full">
    <image width="94" height="21" preserveAspectRatio="none" href="data:image/png;base64,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" />
  </svg>
  )
}

