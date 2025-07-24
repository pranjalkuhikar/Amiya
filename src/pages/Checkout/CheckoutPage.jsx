import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../features/cartSlice';
import './CheckoutPage.scss';

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const handlePlaceOrder = () => {
    // Placeholder for order processing logic
    alert('Order Placed! (This is a placeholder)');
    // In a real application, you would send this data to a backend
    // and handle payment processing.
  };

  return (
    <div className="checkout-page">
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

          <h2>Payment Information</h2>
          <form>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber" required />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
              <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" required />
            </div>
          </form>
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
                    <img src={item.image} alt={item.name} className="item-image" />
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