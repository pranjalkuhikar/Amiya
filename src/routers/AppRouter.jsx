import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Shop from "../pages/Shop/Shop";
import Navbar from "../components/layout/Navbar/Navbar";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Dashboard from "../pages/Account/Dashboard";
import Footer from "../components/layout/Footer/Footer";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;
