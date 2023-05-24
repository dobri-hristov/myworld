import React from "react";
import Navigation from "./Components/Navbar";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing/routes";

function App() {

  return (
    <div>
      <Navigation />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
