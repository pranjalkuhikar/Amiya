import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../features/cartSlice";
import "./CheckoutPage.scss";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const CheckoutPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [alert, setAlert] = useState({ message: "", type: "" });

  const handlePlaceOrder = () => {
    // In a real application, you would send this data to a backend
    // and handle payment processing.
    setAlert({
      message:
        "Your order has been successfully placed! Thank you for your purchase.",
      type: "success",
    });
    // Optionally, clear the alert after a few seconds
    setTimeout(() => setAlert({ message: "", type: "" }), 5000);
  };

  return (
    <div className="checkout-page">
      <CustomAlert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "" })}
      />
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="shipping-payment-section">
          <h2>Shipping Information</h2>
          <form>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" required />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input type="text" id="zipCode" name="zipCode" required />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" required />
            </div>
          </form>

          <div className="payment">
            <h2>Payment Information</h2>
            <form className="payment-form">
              <div className="form-group">
                <label htmlFor="cardNumber" style={{ color: "white" }}>
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value.replace(/[^0-9]/g, "").slice(0, 16)
                    )
                  }
                  placeholder="4242 4242 4242 4242"
                />
              </div>

              <div className="expiry-cvv-grid">
                <div className="form-group">
                  <label htmlFor="expiryMonth" style={{ color: "white" }}>
                    Expiry Month
                  </label>
                  <input
                    type="text"
                    id="expiryMonth"
                    placeholder="MM"
                    value={expiryMonth}
                    onChange={(e) =>
                      setExpiryMonth(
                        e.target.value.replace(/[^0-9]/g, "").slice(0, 2)
                      )
                    }
                    maxLength="2"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiryYear" style={{ color: "white" }}>
                    Expiry Year
                  </label>
                  <input
                    type="text"
                    id="expiryYear"
                    placeholder="YY"
                    value={expiryYear}
                    onChange={(e) =>
                      setExpiryYear(
                        e.target.value.replace(/[^0-9]/g, "").slice(0, 2)
                      )
                    }
                    maxLength="2"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv" style={{ color: "white" }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))
                    }
                    maxLength="3"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price.toFixed(2)}</p>
                      {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="order-total">
                <p>Subtotal: ₹{cartTotal.toFixed(2)}</p>
                <p>Shipping: ₹0.00</p>
                <h3>Total: ₹{cartTotal.toFixed(2)}</h3>
              </div>
              <button className="place-order-button" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
