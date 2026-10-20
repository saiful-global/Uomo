import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Components/layout/RootLayout';
import Home from "./Pages/Home";
import About from './Pages/About';
import Shop from './Pages/Shop';
import ShopSingle from './Pages/ShopSingle';
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import Confirmation from "./Pages/Confirmation"
import OrderTracking from "./Pages/OrderTracking"
import MyAccount from "./Pages/MyAccount"
import AccountDetails from "./Pages/AccountDetails"
import Orders from "./Pages/Orders"
import Addresses from "./Pages/Addresses"

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
      { path: "checkout", Component: Checkout },
      { path: "order-confirmation", Component: Confirmation },
      { path: "order-tracking", Component: OrderTracking },
      { path: "my-account", Component: MyAccount },
      { path: "my-account/account-details", Component: AccountDetails },
      { path: "my-account/orders", Component: Orders },
      { path: "my-account/addresses", Component: Addresses },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
