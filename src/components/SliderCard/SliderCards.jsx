import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./SliderCards.scss";

export default function SliderCards({ cards = [] }) {
  const [sliderRef] = useKeenSlider({
    slides: { perView: 2, spacing: 24 },
    loop: true,
    mode: "free-snap",
    breakpoints: {
      "(max-width: 1200px)": { slides: { perView: 2, spacing: 18 } },
      "(max-width: 900px)": { slides: { perView: 1.2, spacing: 12 } },
      "(max-width: 600px)": { slides: { perView: 1, spacing: 6 } },
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider slider-cards">
      {cards.map((card, idx) => (
        <div className="keen-slider__slide card-slide" key={card.id || idx}>
          <div className="slider-card">
            <img src={card.img} alt={card.title} className="slider-card__img" />
            <div className="slider-card__body">
              <h3 className="slider-card__title">{card.title}</h3>
              <p className="slider-card__desc">{card.desc}</p>
              {card.price && (
                <div className="slider-card__price mt-2 font-bold text-lg text-gray-700">
                  ₹{card.price}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
