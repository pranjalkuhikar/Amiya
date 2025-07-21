import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const Menu = () => {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav
      className="w-full bg-white/90 backdrop-blur-md shadow-md py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-40 border-b border-gray"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      <div
        className="text-2xl font-extrabold tracking-tight text-primary select-none"
        style={{ letterSpacing: "-0.02em" }}
      >
        Amiya
      </div>
      <div className="flex gap-8 text-lg font-medium items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary underline"
              : "text-black hover:text-primary transition"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-primary underline"
              : "text-black hover:text-primary transition"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary underline"
              : "text-black hover:text-primary transition"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-primary underline"
              : "text-black hover:text-primary transition"
          }
        >
          Login
        </NavLink>
        <NavLink to="/cart" className="relative flex items-center group ml-2">
          <ShoppingCart
            size={28}
            strokeWidth={2.2}
            className="text-black group-hover:text-primary transition"
            aria-label="Cart"
          />
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full px-2 py-0.5 shadow"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              {cartCount}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Menu;
