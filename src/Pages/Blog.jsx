import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Container from "../Components/ui/Container";

// Figma filter tabs. dummyjson posts have no such categories,
// so each post gets one from its id (demo only).
const TABS = ["ALL", "COMPANY", "FASHION", "STYLE", "TRENDS", "BEAUTY"];
const CATEGORIES = TABS.slice(1);
const STEP = 4;

// Gray placeholder art that matches the Figma blog image (no image file needed)
const SHAPES = [
  { cx: 260, cy: 250, r: 130, tri: "330,140 460,360 330,360" },
  { cx: 320, cy: 330, r: 220, tri: "420,40 700,500 420,500" },
  { cx: 180, cy: 230, r: 230, tri: "380,0 700,0 700,260" },
];

const BlogImage = ({ variant }) => {
  const s = SHAPES[variant % SHAPES.length];
  return (
    <svg
      viewBox="0 0 690 500"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full block"
      aria-hidden="true"
    >
      <rect width="690" height="500" fill="#E5E5E5" />
      <circle cx={s.cx} cy={s.cy} r={s.r} fill="#B9B9B9" />
      <polygon points={s.tri} fill="#B9B9B9" />
    </svg>
  );
};

const BlogCard = ({ post, index }) => (
  <article>
    <Link to={`/blog/${post.id}`} className="block aspect-69/50 overflow-hidden">
      <BlogImage variant={index} />
    </Link>

    <p className="mt-6 flex gap-x-6 font-jost text-sm leading-6 uppercase text-secondColor">
      <span>By Admin</span>
      <span>April 05, 2020</span>
    </p>

    <h2 className="mt-2 font-jost text-xl md:text-2xl leading-8 text-primary-black">
      <Link to={`/blog/${post.id}`}>{post.title}</Link>
    </h2>

    <p className="mt-7.5 font-jost text-sm leading-6 text-primary-black line-clamp-2">
      {post.body}
    </p>

    <Link
      to={`/blog/${post.id}`}
      className="mt-3 inline-block font-jost font-medium text-sm leading-6 uppercase text-primary-black border-b-2 border-primary-black"
    >
      Continue Reading
    </Link>
  </article>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");
  const [visible, setVisible] = useState(STEP);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/posts?limit=40")
      .then((res) => setPosts(res.data.posts))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeTab === "ALL"
      ? posts
      : posts.filter((p) => CATEGORIES[p.id % CATEGORIES.length] === activeTab);

  const shown = filtered.slice(0, visible);
  const percent = filtered.length ? (shown.length / filtered.length) * 100 : 0;

  const changeTab = (tab) => {
    setActiveTab(tab);
    setVisible(STEP);
  };

  return (
    <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-15 md:pb-25">
      <Container>
        {/* Container has no side padding from md up, so add it here until 1470px */}
        <div className="md:px-7.5 min-[1470px]:px-0">
        <h1 className="font-jost font-bold text-[32px] md:text-[40px] leading-tight uppercase text-primary-black">
          The Blog
        </h1>

        {/* Filter tabs */}
        <ul className="mt-5 flex flex-wrap gap-x-7.5 gap-y-2">
          {TABS.map((tab) => (
            <li key={tab}>
              <button
                type="button"
                onClick={() => changeTab(tab)}
                className={`relative cursor-pointer pb-1 font-jost font-medium text-base leading-6 text-primary-black after:content-[''] after:h-0.5 after:bg-primary-black after:absolute after:bottom-0 after:left-0 after:duration-300 hover:after:w-[60%] ${
                  activeTab === tab ? "after:w-[60%]" : "after:w-0"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* Posts */}
        {loading ? (
          <p className="mt-12.5 font-jost text-sm text-secondColor">Loading...</p>
        ) : error ? (
          <p className="mt-12.5 font-jost text-sm text-redColor">
            Could not load posts. Please try again later.
          </p>
        ) : shown.length === 0 ? (
          <p className="mt-12.5 font-jost text-sm text-secondColor">No posts found.</p>
        ) : (
          <>
            <div className="mt-12.5 grid grid-cols-1 md:grid-cols-2 gap-x-7.5 gap-y-10">
              {shown.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Showing X of Y + progress + show more */}
            <div className="mt-15 md:mt-18.5 flex flex-col items-center">
              <p className="font-jost font-medium text-sm leading-6 text-primary-black">
                SHOWING {shown.length} of {filtered.length} Items
              </p>
              <div className="mt-3 w-full max-w-75 h-1.25 bg-bg-footer">
                <div
                  className="h-full bg-primary-black duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
              {shown.length < filtered.length && (
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + STEP)}
                  className="mt-7.5 cursor-pointer font-jost font-medium text-sm leading-6 uppercase text-primary-black border-b-2 border-primary-black"
                >
                  Show More
                </button>
              )}
            </div>
          </>
        )}
        </div>
      </Container>
    </section>
  );
};

export default Blog;
