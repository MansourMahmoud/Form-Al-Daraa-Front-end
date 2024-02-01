import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ScreenProtector from "./pages/ScreenProtector";

const Layout = () => {
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  return (
    <div
      className={`${
        isDarkModeActive ? "dark:bg-darkMode-dark950" : "bg-main-bg"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <Header setIsDarkModeActive={setIsDarkModeActive} />
      <Routes>
        <Route
          path="/"
          element={<ScreenProtector isDarkModeActive={isDarkModeActive} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default Layout;
