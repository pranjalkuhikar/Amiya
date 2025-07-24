import { Elements } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Stripe initialization
const stripePromise = loadStripe("your-publishable-key");

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/order-success",
      },
    });

    if (error) {
      console.error(error);
    } else {
      navigate("/order-success");
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-container">
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">
            Pay $
            {cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
          </button>
        </form>

        <div className="order-summary">
          <h3>Your Order</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>Size: {item.selectedSize}</p>
                <p>Color: {item.selectedColor}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Elements>
  );
}
