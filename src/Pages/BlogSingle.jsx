import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "../Components/ui/Container";

// Same demo categories as Blog.jsx (category = CATEGORIES[post.id % 5])
const CATEGORIES = ["COMPANY", "FASHION", "STYLE", "TRENDS", "BEAUTY"];
// Blog.jsx lists the first 40 posts, so PREV/NEXT stay inside 1..40
const TOTAL = 40;
const NARROW = "max-w-232.5 mx-auto";

// Static sample text from Figma (the post title, first paragraph, meta and reviews come from dummyjson)
const LOREM_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien dignissim a elementum. Sociis metus, hendrerit mauris id in. Quis sit sit ultrices tincidunt euismod luctus diam. Turpis sodales orci etiam phasellus lacus id leo. Amet turpis nunc, nulla massa est viverra interdum. Praesent auctor nulla morbi non posuere mattis. Arcu eu id maecenas cras. Eget fames tincidunt leo, sed vitae, pretium interdum. Non massa, imperdiet nunc sit sapien. Tempor lectus ornare quis mi vel. Nibh euismod donec elit posuere lobortis consequat faucibus aliquam metus. Ornare consequat, vulputate sit maecenas mauris urna sed fringilla. Urna fermentum iaculis pharetra, maecenas dui nullam nullam rhoncus. Facilisis quis vulputate sem gravida lacus, justo placerat.";
const LOREM_2 =
  "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule Evening Creepeth own lesser years itself so seed fifth for grass evening fourth shall you're unto that. Had. Female replenish for yielding so saw all one to yielding grass you'll air sea it, open waters subdue, hath. Brought second Made. Be. Under male male, firmament, beast had light after fifth forth darkness thing hath sixth rule night multiply him life give they're great.";
const LOREM_3 =
  "She'd years darkness days. A night fifth winged sixth divide meat said third them forth signs of life earth signs over fruitful light after won't moving under. Thing yielding upon seed. Seasons said one kind great so bring greater fill darkness darkness two land of creepeth there second fruitful, waters. Make don't void years Gathering gathering divide fill.";
const BULLETS = [
  "Creat by cotton fibric with soft and smooth",
  "Simple, Configurable (e.g. size, color, etc.), bundled",
  "Downloadable/Digital Products, Virtual Products",
];
const NUMBERS = [
  "Create Store-specific attributes on the fly",
  "Simple, Configurable (e.g. size, color, etc.), bundled",
  "Downloadable/Digital Products, Virtual Products",
];

const formatDate = (d) =>
  d.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });

// Gray placeholder art (matches the Figma blog images, no image file needed)
const Art = ({ w, h, cx, cy, r, tri }) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    preserveAspectRatio="xMidYMid slice"
    className="w-full h-full block"
    aria-hidden="true"
  >
    <rect width={w} height={h} fill="#E5E5E5" />
    <circle cx={cx} cy={cy} r={r} fill="#B9B9B9" />
    <polygon points={tri} fill="#B9B9B9" />
  </svg>
);

const Stars = ({ count = 5, size = 12 }) => (
  <div className="flex gap-x-0.5" aria-label={`${count} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <FaStar
        key={n}
        size={size}
        className={n <= count ? "text-[#F5A623]" : "text-bg-footer"}
      />
    ))}
  </div>
);

// Floating-label field (peer + placeholder=" " pattern)
const FloatingField = ({ label, multiline, ...props }) => {
  const base =
    "peer w-full border border-bg-footer bg-primary-white px-5 font-jost text-sm text-primary-black outline-none focus:border-primary-black duration-200";
  return (
    <div className="relative">
      {multiline ? (
        <textarea {...props} placeholder=" " className={`${base} h-52.5 pt-6 resize-none`} />
      ) : (
        <input {...props} placeholder=" " className={`${base} h-12.5`} />
      )}
      <label
        htmlFor={props.id}
        className={`absolute left-4 -translate-y-1/2 px-1 bg-primary-white font-jost text-sm text-secondColor pointer-events-none duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-black peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs ${
          multiline ? "top-7" : "top-1/2"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const EMPTY_FORM = { review: "", name: "", email: "" };

const BlogArticle = ({ id }) => {
  const [status, setStatus] = useState("loading");
  const [post, setPost] = useState(null);
  const [titles, setTitles] = useState({});
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let ignore = false;
    Promise.all([
      axios.get(`https://dummyjson.com/posts/${id}`),
      axios
        .get(`https://dummyjson.com/comments/post/${id}`)
        .catch(() => ({ data: { comments: [] } })),
      axios
        .get(`https://dummyjson.com/posts?limit=${TOTAL}&select=title`)
        .catch(() => ({ data: { posts: [] } })),
    ])
      .then(([p, c, l]) => {
        if (ignore) return;
        setPost(p.data);
        setReviews(
          c.data.comments.map((cm) => ({
            id: cm.id,
            name: cm.user?.fullName || cm.user?.username || "Customer",
            date: "April 06, 2020",
            body: cm.body,
            rating: 5,
          }))
        );
        setTitles(Object.fromEntries(l.data.posts.map((x) => [x.id, x.title])));
        setStatus("ready");
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-20">
        <Container>
          <p className="px-3.75 md:px-7.5 font-jost text-sm text-secondColor">Loading...</p>
        </Container>
      </section>
    );
  }

  if (status === "error" || !post) {
    return (
      <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-20">
        <Container>
          <div className="md:px-7.5 min-[1470px]:px-0">
            <p className="font-jost text-sm text-redColor">Post not found.</p>
            <Link
              to="/blog"
              className="mt-4 inline-block font-jost font-medium text-sm uppercase text-primary-black border-b-2 border-primary-black"
            >
              Back to the blog
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const numId = Number(id);
  const category = CATEGORIES[post.id % CATEGORIES.length];
  const prevId = numId > 1 ? numId - 1 : null;
  const nextId = numId < TOTAL ? numId + 1 : null;
  const prevTitle = prevId ? titles[prevId] : null;
  const nextTitle = nextId ? titles[nextId] : null;

  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(post.title);
  const shareLinks = [
    {
      label: "Share on Facebook",
      color: "bg-[#3B5998]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    },
    {
      label: "Share on Twitter",
      color: "bg-[#1DC8FF]",
      href: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
    },
    {
      label: "Share on Pinterest",
      color: "bg-[#E02A2D]",
      href: `https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${pageTitle}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setSent(false);
  };

  // Reviews are kept in state only (nothing is stored)
  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews((r) => [
      ...r,
      {
        id: Date.now(),
        name: form.name.trim(),
        date: formatDate(new Date()),
        body: form.review.trim(),
        rating,
      },
    ]);
    setForm(EMPTY_FORM);
    setRating(5);
    setSent(true);
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Uomo</title>
      </Helmet>

      {/* mt-15 md:mt-20 keeps the content under the fixed header */}
      <article className="mt-15 md:mt-20 pt-10 md:pt-20 pb-20 md:pb-28">
        <Container>
          {/* Container has no side padding from md up, so add it here until 1470px */}
          <div className="md:px-7.5 min-[1470px]:px-0">
            {/* Title + meta */}
            <div className={NARROW}>
              <h1 className="font-jost font-bold text-2xl md:text-4xl leading-tight uppercase text-primary-black">
                {post.title}
              </h1>
              <p className="mt-3 flex flex-wrap gap-x-7 font-jost text-sm leading-6 uppercase text-secondColor">
                <span>By Admin</span>
                <span>April 05, 2020</span>
                <span>{category}</span>
              </p>
            </div>

            {/* Hero image */}
            <div className="mt-8 md:mt-13.5 aspect-4/3 md:aspect-1410/550 overflow-hidden">
              <Art w={1410} h={550} cx={583} cy={365} r={281} tri="825,0 1122,365 583,365" />
            </div>

            {/* Text block 1 */}
            <div className={`${NARROW} mt-10 md:mt-14`}>
              <p className="font-jost text-sm leading-7.5 text-primary-black">{post.body}</p>

              <h2 className="mt-10 md:mt-15 font-jost font-medium text-base leading-6 text-primary-black">
                Sed do eiusmod tempor incididunt ut labore
              </h2>
              <p className="mt-6 md:mt-9 font-jost text-sm leading-7.5 text-primary-black">
                {LOREM_2}
              </p>

              <div className="mt-7.5 grid grid-cols-1 sm:grid-cols-2 gap-x-7.5 gap-y-7.5">
                <div>
                  <h3 className="font-jost font-medium text-base leading-6 text-primary-black">
                    Why choose product?
                  </h3>
                  <ul className="mt-6.5">
                    {BULLETS.map((t) => (
                      <li key={t} className="flex font-jost text-sm leading-7.75 text-primary-black">
                        <span className="w-4 shrink-0 pt-3.5">
                          <span className="block w-1 h-1 rounded-full bg-secondColor" />
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-jost font-medium text-base leading-6 text-primary-black">
                    Sample Number List
                  </h3>
                  <ul className="mt-6.5">
                    {NUMBERS.map((t, i) => (
                      <li key={t} className="flex font-jost text-sm leading-7.75 text-primary-black">
                        <span className="w-4 shrink-0 text-secondColor">{i + 1}</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-8 md:mt-10 font-jost text-sm leading-7.5 text-primary-black">
                {LOREM_3}
              </p>
            </div>

            {/* Two images (wider than the text column) */}
            <div className="max-w-292.5 mx-auto mt-8 md:mt-11 grid grid-cols-1 sm:grid-cols-2 gap-7.5">
              <div className="aspect-570/650 overflow-hidden">
                <Art w={570} h={650} cx={170} cy={430} r={250} tri="400,0 570,0 570,330" />
              </div>
              <div className="aspect-570/650 overflow-hidden">
                <Art w={570} h={650} cx={185} cy={520} r={260} tri="423,110 570,420 280,420" />
              </div>
            </div>

            {/* Text block 2 + share + prev/next + reviews */}
            <div className={`${NARROW} mt-10 md:mt-12`}>
              <p className="font-jost text-sm leading-7.5 text-primary-black">{LOREM_1}</p>
              <p className="mt-10 md:mt-15 font-jost text-sm leading-7.5 text-primary-black">
                {LOREM_3}
              </p>

              {/* Share buttons */}
              <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-2.5">
                {shareLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${s.color} flex items-center justify-center h-12 px-4 flex-1 min-w-36 md:flex-none md:px-8 lg:w-54.5 lg:px-0 font-jost text-sm text-primary-white hover:opacity-90 duration-300`}
                  >
                    {s.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copy link"
                  className="flex items-center justify-center w-12 h-12 shrink-0 bg-primary-black text-primary-white text-xl cursor-pointer hover:opacity-90 duration-300"
                >
                  {copied ? "✓" : "+"}
                </button>
              </div>

              {/* Previous / next post */}
              <nav className="mt-10 md:mt-12.5 border-y border-bg-footer py-8 md:py-11 grid grid-cols-2 gap-x-6">
                <div>
                  {prevId && prevTitle && (
                    <Link to={`/blog/${prevId}`} className="block">
                      <span className="flex items-center gap-x-2 font-jost text-sm leading-6 uppercase text-secondColor">
                        <FaChevronLeft size={9} />
                        Previous Post
                      </span>
                      <span className="block font-jost text-sm leading-6 text-primary-black">
                        {prevTitle}
                      </span>
                    </Link>
                  )}
                </div>
                <div className="text-right">
                  {nextId && nextTitle && (
                    <Link to={`/blog/${nextId}`} className="block">
                      <span className="flex items-center justify-end gap-x-2 font-jost text-sm leading-6 uppercase text-secondColor">
                        Next Post
                        <FaChevronRight size={9} />
                      </span>
                      <span className="block font-jost text-sm leading-6 text-primary-black">
                        {nextTitle}
                      </span>
                    </Link>
                  )}
                </div>
              </nav>

              {/* Reviews */}
              <h2 className="mt-10 md:mt-12.5 font-jost font-medium text-base leading-6 text-primary-black">
                Reviews
              </h2>
              {reviews.length === 0 ? (
                <p className="mt-5 font-jost text-sm text-secondColor">
                  There are no reviews yet.
                </p>
              ) : (
                <ul>
                  {reviews.map((r) => (
                    <li
                      key={r.id}
                      className="flex gap-x-4 md:gap-x-7.5 py-7.5 border-b border-bg-footer last:border-b-0"
                    >
                      <div className="w-10 h-10 md:w-15 md:h-15 shrink-0 rounded-full bg-bg-footer" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-x-4">
                          <div>
                            <p className="font-jost font-medium text-sm leading-6 text-primary-black">
                              {r.name}
                            </p>
                            <p className="font-jost text-sm leading-6 text-secondColor">{r.date}</p>
                          </div>
                          <Stars count={r.rating} />
                        </div>
                        <p className="mt-5 font-jost text-sm leading-6 text-secondColor">
                          {r.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Review form */}
              <h2 className="mt-10 md:mt-13 font-jost font-medium text-base leading-6 text-primary-black">
                Be the first to review “{post.title}”
              </h2>
              <p className="mt-2 font-jost text-sm leading-6 text-primary-black">
                Your email address will not be published. Required fields are marked *
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mt-7.5 flex items-center gap-x-3">
                  <span className="font-jost text-sm leading-6 text-secondColor">
                    Your rating *
                  </span>
                  <div className="flex gap-x-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        aria-label={`Rate ${n} out of 5`}
                        className="cursor-pointer"
                      >
                        <FaStar
                          size={14}
                          className={n <= rating ? "text-[#F5A623]" : "text-bg-footer"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7 space-y-8">
                  <FloatingField
                    id="review-text"
                    label="Your Review"
                    multiline
                    required
                    value={form.review}
                    onChange={update("review")}
                  />
                  <FloatingField
                    id="review-name"
                    label="Name *"
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                  />
                  <FloatingField
                    id="review-email"
                    label="Email address *"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                  />
                </div>

                <label className="mt-8 flex items-start gap-x-3 font-jost text-[13px] leading-5 text-secondColor cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 shrink-0 accent-[#222222]" />
                  Save my name, email, and website in this browser for the next time I comment.
                </label>

                <button
                  type="submit"
                  className="mt-7.5 w-full sm:w-49.5 h-14.5 bg-primary-black text-primary-white font-jost font-medium text-sm uppercase cursor-pointer hover:opacity-85 duration-300"
                >
                  Submit
                </button>
                {sent && (
                  <p className="mt-4 font-jost text-sm text-primary-black">
                    Thank you! Your review has been added.
                  </p>
                )}
              </form>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
};

// Reads :id and remounts the article when it changes (resets form, reviews and loading state)
const BlogSingle = () => {
  const { id } = useParams();
  return <BlogArticle key={id} id={id} />;
};

export default BlogSingle;
