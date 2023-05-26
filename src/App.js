import React from "react";
import Navigation from "./Components/Navbar";
import { routes } from "./routing/routes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // for gh-pages change to HasRouter
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          {routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
