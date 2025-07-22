import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="logo ">Amiya</div>
        <div className="menu">
          <div>Home</div>
          <div>Shop</div>
          <div>About</div>
          <div>Contact</div>
        </div>
        <div className="btn">
          <div>Cart</div>
          <div>User</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
