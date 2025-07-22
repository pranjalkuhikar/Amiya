import React from "react";
import "./Home.scss";
import { MoveRight } from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home__content">
          <div className="home__content__title">
            <span>True</span> to Oneself kind to <span>Nature</span>
          </div>
          <div className="home__content__text">
            Unreservedly honest products that truly work, be kind to skin and
            the planet - no exceptions!
          </div>
        </div>
        <div className="btn">
          <div className="line1"></div>
          <div className="text">Explore All Products</div>
          <div className="line2">
            <span>
              <MoveRight size={20} color="#fff" />
            </span>
            <span>
              <MoveRight size={20} color="#fff" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
