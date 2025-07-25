import React from 'react';
import './CustomAlert.scss';

const CustomAlert = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`custom-alert custom-alert--${type}`}>
      <div className="custom-alert__content">
        <p>{message}</p>
        <button className="custom-alert__close-button" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

export default CustomAlert;