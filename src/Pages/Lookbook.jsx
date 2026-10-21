import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Container from "../Components/ui/Container";

// Cards are added 6 at a time (one full mosaic pattern)
const STEP = 6;

// Mosaic pattern from Figma: s = small card, t = tall card (spans 2 rows on md+)
const PATTERN = ["s", "t", "s", "t", "s", "s"];

// Colors per card (taken from the Figma frame).
// bg = left strip, panel = main area, shape = circle/triangle, inner = cut-out wedge, strip = width of left strip (0-1)
const STYLES = [
  { bg: "#D6001C", panel: "#C2001B", shape: "#9E0016", inner: "#C2001B", strip: 0.36, light: true },
  { bg: "#E5E5E5", panel: "#E5E5E5", shape: "#B9B9B9", inner: "#E5E5E5", strip: 0, light: false },
  { bg: "#E8E4DE", panel: "#E5E5E1", shape: "#B9B9B9", inner: "#E5E5E1", strip: 0.46, light: false },
  { bg: "#F3F3F7", panel: "#E5E5E5", shape: "#B9B9B9", inner: "#E5E5E5", strip: 0.24, light: false },
  { bg: "#EAE8E6", panel: "#E5E5E5", shape: "#B9B9B9", inner: "#E5E5E5", strip: 0.44, light: false },
  { bg: "#EAF2EA", panel: "#E5E5E5", shape: "#B9B9B9", inner: "#E5E5E5", strip: 0.34, light: false },
];

// Placeholder art that matches the Figma lookbook image (no image file needed)
const Art = ({ tall, s }) => {
  const h = tall ? 825 : 397;
  const g = tall
    ? {
        c: { cx: 269, cy: 620, r: 318 },
        tri: "621,94 690,212 690,620 269,620",
        inner: "470,352 621,620 315,620",
      }
    : {
        c: { cx: 424, cy: 247, r: 147 },
        tri: "573,4 678,185 678,247 424,247",
        inner: "502,123 574,247 431,247",
      };

  return (
    <svg
      viewBox={`0 0 690 ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full block"
      aria-hidden="true"
    >
      <rect width="690" height={h} fill={s.panel} />
      <circle cx={g.c.cx} cy={g.c.cy} r={g.c.r} fill={s.shape} />
      <polygon points={g.tri} fill={s.shape} />
      <polygon points={g.inner} fill={s.inner} />
      {/* left strip hides the part of the circle outside the main area */}
      {s.strip > 0 && <rect width={690 * s.strip} height={h} fill={s.bg} />}
    </svg>
  );
};

const LookCard = ({ item, index }) => {
  const tall = PATTERN[index % PATTERN.length] === "t";
  const s = STYLES[index % STYLES.length];

  return (
    <Link
      to="/shop"
      className={`relative block overflow-hidden ${
        tall ? "aspect-690/825 md:aspect-auto md:row-span-2" : "aspect-690/397"
      }`}
    >
      <Art tall={tall} s={s} />
      <div
        className={`absolute left-5 bottom-5 md:left-12.5 md:bottom-11 pr-5 ${
          s.light ? "text-primary-white" : "text-primary-black"
        }`}
      >
        <p className="font-jost font-medium text-sm leading-6 uppercase">
          Starting at ${Math.floor(item.price)}
        </p>
        <h2 className="font-jost font-medium text-xl md:text-2xl leading-8 capitalize">
          {item.category.replace(/-/g, " ")}
        </h2>
      </div>
    </Link>
  );
};

const Lookbook = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(STEP);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=200")
      .then((res) => {
        // one card per category, with the lowest price in that category
        const lowest = new Map();
        res.data.products.forEach((p) => {
          const cur = lowest.get(p.category);
          if (cur === undefined || p.price < cur) lowest.set(p.category, p.price);
        });
        setItems(
          [...lowest].map(([category, price], i) => ({ id: i, category, price }))
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const shown = items.slice(0, visible);

  return (
    <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-15 md:pb-25">
      <Container>
        {/* Container has no side padding from md up, so add it here until 1470px */}
        <div className="md:px-7.5 min-[1470px]:px-0">
          <h1 className="font-jost font-bold text-[32px] md:text-[40px] leading-tight uppercase text-primary-black">
            Lookbook
          </h1>

          {loading ? (
            <p className="mt-12.5 font-jost text-sm text-secondColor">Loading...</p>
          ) : error ? (
            <p className="mt-12.5 font-jost text-sm text-redColor">
              Could not load the lookbook. Please try again later.
            </p>
          ) : (
            <>
              <div className="mt-12.5 grid grid-cols-1 md:grid-cols-2 gap-7.5">
                {shown.map((item, i) => (
                  <LookCard key={item.category} item={item} index={i} />
                ))}
              </div>

              {shown.length < items.length && (
                <div className="mt-15 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + STEP)}
                    className="cursor-pointer font-jost font-medium text-sm leading-6 uppercase text-primary-black border-b-2 border-primary-black"
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Lookbook;
