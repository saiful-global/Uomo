// Static menu data shared by NavPanel (desktop) and MobileNab (mobile).
// Text comes from Figma, so it stays static.

export const SHOP_TABS = ["WOMEN", "MEN", "KIDS"]

// arrow = shows a chevron on mobile, sub = opens the "COLLECTION" sub list on mobile
export const SHOP_MAIN = [
  { id: 1, name: "WOMEN", arrow: true },
  { id: 2, name: "MAN", arrow: true },
  { id: 3, name: "KIDS", arrow: true },
  { id: 4, name: "HOME", arrow: true },
  { id: 5, name: "COLLECTION", arrow: true, sub: true },
  { id: 6, name: "SALE UP TO 50% OFF", arrow: true, red: true },
  { id: 7, name: "NEW" },
  { id: 8, name: "SHOES" },
  { id: 9, name: "ACCESSORIES" },
  { id: 10, name: "JOIN LIFE" },
  { id: 11, name: "#UOMOSTYLE" },
]

export const SUB_LINKS = [
  "New",
  "Best Sellers",
  "Collaborations®",
  "Sets",
  "Denim",
  "Jackets & Coats",
  "Overshirts",
  "Trousers",
  "Jeans",
  "Dresses",
  "Sweatshirts and Hoodies",
  "T-shirts & Tops",
  "Shirts & Blouses",
  "Shorts and Bermudas",
  "Shoes",
  "Accessories",
  "Bags",
  "Gift Card",
]

export const PAGES_LINKS = [
  { name: "About", url: "/About" },
  { name: "Contact Us", url: "/contact" },
  { name: "Store Locator", url: "/store-locator" },
  { name: "FAQ", url: "/faq" },
  { name: "Coming Soon", url: "/coming-soon" },
  { name: "404", url: "/404" },
]
