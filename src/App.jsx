import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Components/layout/RootLayout';
import Home from "./Pages/Home";
import About from './Pages/About';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
        { path:"About", Component: About },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App