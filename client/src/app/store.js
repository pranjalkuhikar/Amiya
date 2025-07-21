import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { productsApi } from "../features/productsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
