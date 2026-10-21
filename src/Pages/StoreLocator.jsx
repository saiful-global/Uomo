import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Container from "../Components/ui/Container";

// Static store list. "query" is the place name sent to Google Maps.
// Address, phone and hours are sample text from Figma.
const STORES = [
  { id: 1, city: "London", country: "United Kingdom", query: "London, United Kingdom" },
  { id: 2, city: "Bangladesh", country: "Bangladesh", query: "Dhaka, Bangladesh" },
  { id: 3, city: "New York", country: "United States", query: "New York, United States" },
];

// Same sample details for every store (from Figma)
const StoreDetails = () => (
  <p className="font-jost text-sm leading-6 text-primary-black">
    1418 River Drive, Suite 35 Cottonhall, CA 9622
    <br />
    United States
    <br />
    +1 246-345-0695
    <br />
    10 am - 10 pm EST, 7 days a week
  </p>
);

const StoreLocator = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(2);
  const [showPopup, setShowPopup] = useState(true);
  const mapRef = useRef(null);

  const selected = STORES.find((s) => s.id === selectedId);

  // Filter by country or city
  const term = search.trim().toLowerCase();
  const visibleStores = STORES.filter((s) =>
    `${s.city} ${s.country}`.toLowerCase().includes(term)
  );

  const handleSeeOnMap = (id) => {
    setSelectedId(id);
    setShowPopup(true);
    // On phones the map is above the list, so bring it into view
    if (window.matchMedia("(max-width: 1023px)").matches) {
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Store Locator | Uomo</title>
      </Helmet>

      {/* mt-15 md:mt-20 keeps the content under the fixed header */}
      <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-16 md:pb-37.5">
        <Container>
          <h1 className="font-jost font-bold uppercase text-primary-black leading-tight text-2xl sm:text-3xl md:text-[40px] mb-8 md:mb-13.5">
            Store Locator
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-7.5">
            {/* Left: search + store list (below the map on phones) */}
            <div className="order-2 lg:order-1 lg:h-188 flex flex-col">
              <div className="relative shrink-0">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter your country or city"
                  aria-label="Search stores by country or city"
                  className="w-full h-15 pl-5 pr-14 border border-bg-footer bg-primary-white font-jost text-sm text-primary-black placeholder:text-secondColor outline-none focus:border-primary-black duration-300"
                />
                <svg
                  aria-hidden="true"
                  className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path d="M8.82291 0C3.95809 0 0 3.95121 0 8.80758C0 13.6642 3.95809 17.6152 8.82291 17.6152C13.688 17.6152 17.6458 13.6642 17.6458 8.80758C17.6458 3.95121 13.688 0 8.82291 0ZM8.82291 15.9892C4.85613 15.9892 1.62885 12.7675 1.62885 8.80762C1.62885 4.84773 4.85613 1.62602 8.82291 1.62602C12.7897 1.62602 16.017 4.84769 16.017 8.80758C16.017 12.7675 12.7897 15.9892 8.82291 15.9892Z" fill="#222222" />
                  <path d="M19.7962 18.6122L15.1268 13.9509C14.8086 13.6333 14.2934 13.6333 13.9752 13.9509C13.657 14.2683 13.657 14.7832 13.9752 15.1005L18.6446 19.7618C18.8036 19.9206 19.0119 20 19.2204 20C19.4286 20 19.6371 19.9206 19.7962 19.7618C20.1143 19.4444 20.1143 18.9295 19.7962 18.6122Z" fill="#222222" />
                </svg>
              </div>

              {/* Scrollable list */}
              <ul className="max-h-120 lg:max-h-none lg:flex-1 min-h-0 overflow-y-auto [scrollbar-width:thin]">
                {visibleStores.length === 0 && (
                  <li className="font-jost text-sm text-secondColor py-7">
                    No stores found for this search.
                  </li>
                )}
                {visibleStores.map((store) => (
                  <li
                    key={store.id}
                    className="py-7 border-b border-bg-footer last:border-b-0"
                  >
                    <h2 className="font-jost text-xl font-normal leading-7 text-primary-black mb-2.5">
                      Store in {store.city}
                    </h2>
                    <StoreDetails />
                    <button
                      type="button"
                      onClick={() => handleSeeOnMap(store.id)}
                      className="relative mt-5 pb-1.5 font-jost text-sm font-medium uppercase leading-6 text-primary-black cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-[64%] after:bg-primary-black after:duration-300 hover:after:w-full"
                    >
                      See on the map
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Google Maps embed (default colors) + info popup */}
            <div
              ref={mapRef}
              className="order-1 lg:order-2 relative w-full h-96 lg:h-188 bg-bg-footer"
            >
              <iframe
                title={`Map of Store in ${selected.city}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  selected.query
                )}&z=12&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />

              {showPopup && (
                <div className="absolute left-4 right-4 bottom-4 lg:left-1/2 lg:right-auto lg:bottom-auto lg:top-[55%] lg:-translate-x-1/2 lg:w-88.75 bg-primary-white p-7.5 shadow-[0_5px_30px_rgba(0,0,0,0.12)]">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    aria-label="Close"
                    className="absolute top-4 right-4 cursor-pointer"
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z" fill="#222222" />
                      <path d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z" fill="#222222" />
                    </svg>
                  </button>
                  <h3 className="font-jost text-xl font-normal leading-7 text-primary-black mb-2.5">
                    Store in {selected.city}
                  </h3>
                  <StoreDetails />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default StoreLocator;
