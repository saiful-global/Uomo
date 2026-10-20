import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Components/layout/RootLayout';
import Home from "./Pages/Home";
import About from './Pages/About';
import Shop from './Pages/Shop';
import ShopSingle from './Pages/ShopSingle';
import Cart from "./Pages/Cart"

// The router is created OUTSIDE the component on purpose.
// If it lives inside App, a brand new router is built on every re-render,
// which can reset the navigation state and cause extra work.
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "About", Component: About },
      { path: "shop", Component: Shop },
      // Dynamic route: ":id" is the product id from dummyjson (e.g. /shop/5).
      // ShopSingle reads it with useParams() and fetches that one product.
      { path: "shop/:id", Component: ShopSingle },
      { path: "cart", Component: Cart },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
