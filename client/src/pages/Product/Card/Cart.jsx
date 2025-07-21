import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../../features/cartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10 py-20 px-4 font-sans flex flex-col items-center"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-xl p-8 border border-gray">
        <h1 className="text-3xl font-extrabold mb-8 text-primary text-center">
          Your Cart
        </h1>
        {items.length === 0 ? (
          <div className="text-center text-gray text-lg">
            Your cart is empty.
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray mb-8">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl bg-lightgray"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg mb-1 text-black">
                      {item.title}
                    </h2>
                    <div className="text-primary font-semibold mb-1">
                      ₹{item.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-icon"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-2 font-semibold text-black">
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-icon"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-icon text-primary hover:bg-primary/10"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label="Remove from cart"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-xl text-black">Total:</span>
              <span className="text-primary font-extrabold text-2xl">
                ₹{total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <button
                className="btn btn-secondary btn-full"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
              <button
                className="btn btn-primary btn-full"
                disabled={items.length === 0}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
