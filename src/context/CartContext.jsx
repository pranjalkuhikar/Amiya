import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.reduce((acc, item) => acc + (item.quantity || 1), 0));
    }
  }, []);
  
  // Add item to cart
  const addToCart = (product, selectedSize = '', selectedColor = '', quantity = 1) => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex(
      (item) => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );
    
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({
        ...product,
        selectedSize,
        selectedColor,
        quantity,
        price: parseFloat(product.price),
      });
    }
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart count
    const newCount = updatedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setCartCount(newCount);
    
    // Trigger animation
    setIsCartUpdated(true);
    setTimeout(() => setIsCartUpdated(false), 1500);
    
    return updatedCart;
  };
  
  // Remove item from cart
  const removeFromCart = (itemId, selectedSize = '', selectedColor = '') => {
    const updatedCart = cartItems.filter(
      (item) => 
        !(item.id === itemId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor)
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart count
    const newCount = updatedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setCartCount(newCount);
    
    return updatedCart;
  };
  
  // Update item quantity
  const updateQuantity = (itemId, selectedSize = '', selectedColor = '', newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => {
      if (
        item.id === itemId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      ) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart count
    const newCount = updatedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setCartCount(newCount);
    
    return updatedCart;
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cart');
  };
  
  // Cart counter component with animation
  const CartCounter = () => {
    return (
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            key="cart-count"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ 
              scale: isCartUpdated ? [1, 1.2, 1] : 1, 
              opacity: 1,
              backgroundColor: isCartUpdated ? ['#4F46E5', '#EF4444', '#4F46E5'] : '#4F46E5'
            }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ 
              duration: isCartUpdated ? 0.4 : 0.2,
              times: isCartUpdated ? [0, 0.5, 1] : [0, 1]
            }}
            className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white text-xs font-medium"
            style={{ 
              minWidth: '20px', 
              height: '20px',
              padding: cartCount > 9 ? '0 6px' : '0'
            }}
          >
            {cartCount}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartCount, 
        isCartUpdated,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        CartCounter
      }}
    >
      {children}
    </CartContext.Provider>
  );
};