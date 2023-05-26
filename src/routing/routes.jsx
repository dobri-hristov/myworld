import React from "react";
// import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Countries from "../Pages/Countries";
import Country from "../Pages/Country";
import Cities from "../Pages/Cities";

export const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/countries",
    element: Countries, 
  },
  {
    path: "/countries/:country",
    element: Country,
  },
  {
    path: "/cities",
    element: Cities,
  },
].map((router) => ({
  ...router,
  element: <router.element pageStyle="pt-5 pb-5" />,
  // errorElement: <ErrorPage />,
}));

// export const router = createBrowserRouter([...routes]);
