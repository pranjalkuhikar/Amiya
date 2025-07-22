import React from "react";
import PropTypes from "prop-types";
import { MoveRight } from "lucide-react";
import "./ArrowButton.scss";

export default function ArrowButton({
  icon = <MoveRight size={20} color="#fff" />, // default icon
  onClick,
  size = 64,
  className = "",
  style = {},
}) {
  return (
    <button
      className={`arrow-btn ${className}`}
      onClick={onClick}
      style={{ width: size, height: size, ...style }}
      type="button"
    >
      <div className="arrow-animation">
        <span>{icon}</span>
        <span>{icon}</span>
      </div>
    </button>
  );
}

ArrowButton.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
