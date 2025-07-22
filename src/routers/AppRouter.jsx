import React from "react";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Product from "../pages/Products/Products";
import Navbar from "../components/layout/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  );
};

export default AppRouter;
