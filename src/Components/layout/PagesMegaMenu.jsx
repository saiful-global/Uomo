const PagesMegaMenu = () => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-65 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible -translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 hidden lg:block z-50">
      
      <div className="py-6 px-7.5">
        <ul className="list-item-2">
          <li>About</li>
          <li>Contact Us</li>
          <li>Store Locator</li>
          <li>FAQ</li>
          <li>Coming Soon</li>
          <li>404</li>
        </ul>
      </div>

    </div>
  );
};

export default PagesMegaMenu;