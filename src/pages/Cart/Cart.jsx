import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} from "../../features/apiSlice";

const Cart = () => {
  const { data: cartItems = [], isLoading, isError } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(id).unwrap();
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem({ id, quantity: newQuantity }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.error("Failed to update quantity");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 10 : 0; // $10 shipping fee
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Error loading cart
          </h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto lg:max-w-7xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start adding some items to your cart
              </p>
              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            product.image || "https://via.placeholder.com/150"
                          }
                          alt={product.name}
                          className="w-24 h-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  to={`/product/${product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.category}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              ${product.price}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="flex items-center">
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
                                      (product.quantity || 1) - 1
                                    )
                                  }
                                  className="p-1 text-gray-400 hover:text-gray-500"
                                >
                                  <span className="sr-only">
                                    Decrease quantity
                                  </span>
                                  <FaMinus className="h-4 w-4" />
                                </button>
                                <span className="mx-2 text-sm">
                                  {product.quantity || 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      product.id,
                                      (product.quantity || 1) + 1
                                    )
                                  }
                                  className="p-1 text-gray-400 hover:text-gray-500"
                                >
                                  <span className="sr-only">
                                    Increase quantity
                                  </span>
                                  <FaPlus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                onClick={() => handleRemoveFromCart(product.id)}
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <FaTrash className="h-5 w-5" />
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
                className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Shipping estimate</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${shipping.toFixed(2)}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Checkout
                  </button>
                </div>

                <div className="mt-6 text-center text-sm">
                  <p>
                    or{" "}
                    <Link
                      to="/shop"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
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
