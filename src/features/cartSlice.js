import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: [],
  cartCount: 0,
  isCartUpdated: false,
};

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      return {
        cartItems: parsedCart,
        cartCount: parsedCart.reduce((acc, item) => acc + (item.quantity || 1), 0),
        isCartUpdated: false,
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return initialState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedSize = '', selectedColor = '', quantity = 1 } = action.payload;
      
      const existingItemIndex = state.cartItems.findIndex(
        (item) => 
          item.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );
      
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        state.cartItems.push({
          ...product,
          selectedSize,
          selectedColor,
          quantity,
          price: parseFloat(product.price),
        });
      }
      
      // Update cart count
      state.cartCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
      
      // Trigger animation
      state.isCartUpdated = true;
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      
      // Show toast notification
      toast.success(`${product.name} added to cart`);
    },
    
    removeFromCart: (state, action) => {
      const { itemId, selectedSize = '', selectedColor = '' } = action.payload;
      
      state.cartItems = state.cartItems.filter(
        (item) => 
          !(item.id === itemId && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor)
      );
      
      // Update cart count
      state.cartCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    
    updateQuantity: (state, action) => {
      const { itemId, selectedSize = '', selectedColor = '', newQuantity } = action.payload;
      
      if (newQuantity < 1) return;
      
      const itemIndex = state.cartItems.findIndex(
        (item) => 
          item.id === itemId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );
      
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = newQuantity;
        
        // Update cart count
        state.cartCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    
    clearCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
      localStorage.removeItem('cart');
    },
    
    resetCartUpdateFlag: (state) => {
      state.isCartUpdated = false;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  resetCartUpdateFlag
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartCount = (state) => state.cart.cartCount;
export const selectIsCartUpdated = (state) => state.cart.isCartUpdated;

export default cartSlice.reducer;