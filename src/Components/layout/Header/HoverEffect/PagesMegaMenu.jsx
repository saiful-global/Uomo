import { Link } from "react-router";

const PagesMegaMenu = () => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-65 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible -translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 hidden lg:block z-50">
      
      <div className="py-6 px-7.5">
        <ul className="list-item-2">
          {/* Route in App.jsx is "About" with a capital A */}
          <li><Link to="/About" className="block">About</Link></li>
          {/* Pages below are not built yet, so they stay as plain text */}
          <li>Contact Us</li>
          <li>Store Locator</li>
          <li><Link to="/faq" className="block">FAQ</Link></li>
          <li>Coming Soon</li>
          {/* "/404" has no route, so the catch-all NotFound page opens */}
          <li><Link to="/404" className="block">404</Link></li>
        </ul>
      </div>

    </div>
  );
};

export default PagesMegaMenu;
