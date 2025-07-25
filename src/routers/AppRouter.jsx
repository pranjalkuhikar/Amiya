import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import AboutPage from "../pages/About/AboutPage";
import Shop from "../pages/Shop/Shop";
import Navbar from "../components/layout/Navbar/Navbar";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import Dashboard from "../pages/Account/Dashboard";

import Footer from "../components/layout/Footer/Footer";
import ProductDetail from "../pages/Shop/ProductDetail";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/account"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route
          path="/account"
          element={
            <SignedOut>
              <Navigate to={`/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`} />
            </SignedOut>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;
