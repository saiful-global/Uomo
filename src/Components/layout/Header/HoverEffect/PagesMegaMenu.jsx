import { Link } from "react-router";

// isOpen = click-to-open state used below lg (from lg up the menu opens on hover)
const PagesMegaMenu = ({ isOpen }) => {
  return (
    <div data-mega className={`absolute top-full left-1/2 -translate-x-1/2 w-65 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible -translate-y-3 lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0 transition-all duration-300 z-50 ${isOpen ? 'max-lg:opacity-100 max-lg:visible max-lg:translate-y-0' : ''}`}>
      
      <div className="py-6 px-7.5">
        <ul className="list-item-2">
          {/* Route in App.jsx is "About" with a capital A */}
          <li><Link to="/About" className="block">About</Link></li>
          <li><Link to="/contact" className="block">Contact Us</Link></li>
          <li><Link to="/store-locator" className="block">Store Locator</Link></li>
          <li><Link to="/faq" className="block">FAQ</Link></li>
          <li><Link to="/coming-soon" className="block">Coming Soon</Link></li>
          {/* "/404" has no route, so the catch-all NotFound page opens */}
          <li><Link to="/404" className="block">404</Link></li>
        </ul>
      </div>

    </div>
  );
};

export default PagesMegaMenu;
