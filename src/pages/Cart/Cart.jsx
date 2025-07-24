import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  selectCartItems,
} from "../../features/cartSlice";
import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleRemoveFromCart = (id, selectedSize, selectedColor) => {
    dispatch(removeFromCart({ itemId: id, selectedSize, selectedColor }));
  };

  const handleUpdateQuantity = (
    id,
    selectedSize,
    selectedColor,
    newQuantity
  ) => {
    dispatch(
      updateQuantity({ itemId: id, selectedSize, selectedColor, newQuantity })
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 10 : 0; // ₹10 shipping fee
  const total = subtotal + shipping;

  return (
    <div className="cart-page-container">
      <div className="cart-content-wrapper">
        <div className="cart-inner-wrapper">
          <h1 className="cart-heading">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart-container">
              <svg
                className="empty-cart-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="empty-cart-title">Your cart is empty</h3>
              <p className="empty-cart-text">
                Start adding some items to your cart
              </p>
              <div className="empty-cart-button-wrapper">
                <Link
                  to="/shop"
                  className="continue-shopping-button font-[PPS]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="cart-main-content">
              <section
                aria-labelledby="cart-heading"
                className="cart-items-section"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul role="list" className="cart-item-list">
                  {cartItems.map((product) => (
                    <li key={product.id} className="cart-item">
                      <div className="cart-item-image-wrapper">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="cart-item-image"
                        />
                      </div>

                      <div className="cart-item-details">
                        <div className="cart-item-info">
                          <div>
                            <div className="cart-item-header">
                              <h3 className="cart-item-name">
                                <Link
                                  to={`/product/${product.id}`}
                                  className="cart-item-link"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <p className="cart-item-category">
                              {product.category}
                            </p>
                            <p className="cart-item-price">₹{product.price}</p>
                          </div>

                          <div className="cart-item-actions">
                            <div className="cart-item-quantity-controls">
                              <label
                                htmlFor={`quantity-${product.id}`}
                                className="sr-only"
                              >
                                Quantity, {product.name}
                              </label>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      product.id,
                                      product.selectedSize,
                                      product.selectedColor,
                                      (product.quantity || 1) - 1
                                    )
                                  }
                                  className="quantity-button"
                                >
                                  <span className="sr-only">
                                    Decrease quantity
                                  </span>
                                  <FaMinus className="quantity-icon" />
                                </button>
                                <span className="quantity-display">
                                  {product.quantity || 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      product.id,
                                      product.selectedSize,
                                      product.selectedColor,
                                      (product.quantity || 1) + 1
                                    )
                                  }
                                  className="quantity-button"
                                >
                                  <span className="sr-only">
                                    Increase quantity
                                  </span>
                                  <FaPlus className="quantity-icon" />
                                </button>
                              </div>
                            </div>

                            <div className="cart-item-remove-button-wrapper">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveFromCart(
                                    product.id,
                                    product.selectedSize,
                                    product.selectedColor
                                  )
                                }
                                className="remove-item-button"
                              >
                                <span className="sr-only">Remove</span>
                                <FaTrash className="remove-icon" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="order-summary-section"
              >
                <h2
                  id="summary-heading"
                  className="order-summary-heading font-[PPS]"
                >
                  Order summary
                </h2>

                <dl className="order-summary-list">
                  <div className="order-summary-item">
                    <dt className="order-summary-label ">Subtotal</dt>
                    <dd className="order-summary-value">
                      ₹{subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="order-summary-item border-top">
                    <dt className="order-summary-label flex-align-center">
                      <span>Shipping estimate</span>
                    </dt>
                    <dd className="order-summary-value">
                      ₹{shipping.toFixed(2)}
                    </dd>
                  </div>
                  <div className="order-summary-item border-top font-[PPR]">
                    <dt className="order-total-label font-[PPS]">
                      Order total
                    </dt>
                    <dd className="order-total-value">₹{total.toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="checkout-button-wrapper">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(true)}
                    className="checkout-button font-[PPS]"
                  >
                    Checkout
                  </button>
                </div>

                <div
                  className="mt-6 text-center text-sm font-[PPR]"
                  style={{ marginTop: "2rem" }}
                >
                  <p className="flex gap-4 items-center justify-center">
                    or{" "}
                    <Link
                      to="/shop"
                      className="font-medium font-[PPS] text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
