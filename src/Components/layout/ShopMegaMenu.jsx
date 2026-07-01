import Container from "../ui/Container";
import ShopMenuImage from "../../assets/images/shopMenuImage.png"
import Image from "../common/Image";

export default function ShopMegaMenu() {
  return (
    <div className=" absolute left-0 top-full w-full bg-white border-t border-bg-footer shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible -translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 hidden lg:block z-50 " >
      <Container className="flex justify-between items-center gap-36.5 py-10">

        
        {/* LEFT GRID */}
        <div className="grid grid-cols-4 gap-30 flex-1">

          {/* SHOP + PRODUCT */}
          <div>
            <h4 className="font-jost font-medium text-[14px] leading-6 mb-3 uppercase text-secondColor">
              Shop Pages
            </h4>
            <ul className="list-item-2">
              <li>Default</li>
              <li>Topbar</li>
              <li>Collapse</li>
              <li>Simple</li>
              <li>Masonry</li>
            </ul>

            <h4 className="font-jost font-medium text-[14px] mt-7.25 leading-6 mb-3 uppercase text-secondColor">
              Product Pages
            </h4>
            <ul className="list-item-2">
              <li>Default</li>
              <li>Images Left</li>
              <li>Image Grid</li>
              <li>Image Slider</li>
              <li>Images Stacked</li>
            </ul>
          </div>

          {/* OTHER */}
          <div>
            <h4 className="font-jost font-medium text-[14px] leading-6 mb-3 uppercase text-secondColor">
              Other Pages
            </h4>
            <ul className="list-item-2">
              <li>Collection</li>
              <li>Lookbook</li>
              <li>Categories Page</li>
              <li>Shopping Cart</li>
              <li>Wishlist</li>
              <li>Order Tracking</li>
              <li>Checkout</li>
              <li>Checkout – 2 Columns</li>
            </ul>
          </div>

          {/* ELEMENTS */}
          <div>
            <h4 className="font-jost font-medium text-[14px] leading-6 mb-3 uppercase text-secondColor">
              Elements
            </h4>
            <ul className="list-item-2">
              <li>Accordion</li>
              <li>Pricing Table</li>
              <li>Google Maps</li>
              <li>Message Box</li>
              <li>Progress Bars</li>
              <li>Charts</li>
              <li>Icon Box</li>
              <li>Product Tabs</li>
              <li>Products Grid</li>
              <li>Tabs</li>
              <li>Video Players</li>
              <li>Team</li>
            </ul>
          </div>
          <div className="mt-10">
            <ul className="list-item-2">
              <li>Buttons</li>
              <li>Testimonials</li>
              <li>Social Icons</li>
              <li>Blog Posts</li>
            </ul>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative w-102.5 h-112.5 shrink-0 overflow-hidden flex items-end p-7.5">
          {/* Background Image */}
          <Image className="absolute inset-0 w-full h-full object-cover" src={ShopMenuImage} alt="ShopMenuImage" />
          {/* Text Overlay */}
          <div className="relative z-10">
            <h3 className="font-jost font-medium text-[26px] text-primary-black">NEW</h3>
            <h3 className="font-jost font-medium text-[26px] text-primary-black"> HORIZONS </h3>
            <button className="list-item">
              SHOP NOW
            </button>
          </div>
        </div>

      </Container>
    </div>
  );
}