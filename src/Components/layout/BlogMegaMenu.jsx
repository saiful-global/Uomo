export default function BlogMegaMenu() {
  return (
    <div className=" absolute top-full left-1/2 -translate-x-1/2 w-198.75 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible -translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 hidden lg:block z-50 " >
      <div className="py-10 px-15">
        <div className="grid grid-cols-3 gap-30">

          <div>
            <h4 className="font-jost font-medium text-[14px] leading-6 mb-3 uppercase text-secondColor">
              Blog Styles
            </h4>
            <ul className="list-item-2">
              <li>Alternative</li>
              <li>Small images</li>
              <li>Blog chess</li>
              <li>Masonry grid</li>
              <li>Infinit scrolling FEATURE</li>
              <li>With background</li>
              <li>Blog flat</li>
              <li>Default flat</li>
              <li>Blog mask</li>
            </ul>
          </div>

          <div>
            <h4 className="font-jost font-medium text-[14px] leading-6 mb-3 uppercase text-secondColor">
              Single Post
            </h4>
            <ul className="list-item-2">
              <li>Standard Post</li>
              <li>Image Post</li>
              <li>Video Post</li>
              <li>Audio Post</li>
              <li>Gallery Post</li>
            </ul>
          </div>

          <div>
            <h4 className="font-jost font-medium text-[14px] leading-6 mb-3 uppercase text-secondColor">
              Navigation
            </h4>
            <ul className="list-item-2">
              <li>Simple</li>
              <li>Image Background</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}