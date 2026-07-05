[README.md](https://github.com/user-attachments/files/29651146/README.md)
# 🛍️ Uomo — E-Commerce Fashion Store

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A modern, fully responsive e-commerce fashion store built with React and Tailwind CSS, inspired by the Uomo Figma theme.

🌐 **Live Demo:** [Vercel](https://uomo-saiful.vercel.app/) · [Netlify](https://uomo-saiful.netlify.app/)

---

## ✨ Features

### 🏠 Home Page
- **Hero Banner / Slider** — Full-width dynamic banner with call-to-action
- **Category Section** — Stylish product categories with card layout
- **Trendy Products** — Curated trending product grid
- **Limited Products** — Limited edition product showcase
- **Spring Collection** — Seasonal collection highlight section
- **Starting Category** — Entry-level category navigation
- **Uomo Gallery** — Visual brand gallery
- **Trust Badges** — Shipping, returns, and support highlights

### 🛒 Shop Page
- **Shop Banner** — Dedicated shop page hero
- **Product Listing** — All products with grid/list view
- **Sort & View** — Filter and sorting options

### 🧭 Navigation
- **Responsive Header** — Clean navbar with logo and icons
- **Mega Menu** — Hover-activated mega menus for Shop, Blog, and Pages
- **Mobile Navigation** — Fully functional mobile drawer menu
- **Breadcrumb** — Page location indicator

### 🎯 UI & UX
- **Newsletter Popup** — Timed modal (appears after 3s) with email subscription
- **Cookie Consent Banner** — GDPR-friendly cookie notice
- **Scroll To Top** — Smooth scroll-to-top button
- **Footer** — Full-featured site footer

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI component library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Font Awesome](https://fontawesome.com/) | Icon library |


---

## 📁 Project Structure

```
src/
├── api/
├── assets/
├── Components/
│   ├── common/
│   │   ├── Breadcrumb.jsx
│   │   ├── CookieConsent.jsx
│   │   ├── Image.jsx
│   │   ├── Listitem.jsx
│   │   ├── NewsLetter.jsx
│   │   └── Product.jsx
│   ├── Home/
│   │   ├── category/
│   │   │   ├── Card.jsx
│   │   │   └── Category.jsx
│   │   ├── Banner.jsx
│   │   ├── LimitedProduct.jsx
│   │   ├── SpringCollection.jsx
│   │   ├── StartingCategory.jsx
│   │   ├── TrendyProducts.jsx
│   │   ├── TrustBadges.jsx
│   │   └── UomoGallery.jsx
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── HoverEffect/
│   │   │   │   ├── BlogMegaMenu.jsx
│   │   │   │   ├── PagesMegaMenu.jsx
│   │   │   │   └── ShopMegaMenu.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MobileNab.jsx
│   │   │   └── MobileNavigation.jsx
│   │   ├── Footer.jsx
│   │   ├── RootLayout.jsx
│   │   └── ScrollToTop.jsx
│   ├── shop/
│   │   ├── AllProducts.jsx
│   │   ├── ShopBanner.jsx
│   │   └── SortAndView.jsx
│   └── ui/
│       └── Container.jsx
└── pages/
    ├── About.jsx
    ├── Home.jsx
    └── Shop.jsx
```

---

## 📄 Pages

| Page | Route | Status |
|---|---|---|
| Home | `/` | ✅ Done |
| Shop | `/shop` | ✅ Done |
| About | `/about` | ✅ Done |

---

## 🎨 Design Reference

Built from the **Uomo Figma Theme** — a premium e-commerce UI kit featuring 12+ home page variants, shop pages, blog pages, and mobile layouts.

---

## 📝 License

This project is for educational and portfolio purposes only.

---

Made with ❤️ by [Saiful Islam](https://github.com/saiful-global)
