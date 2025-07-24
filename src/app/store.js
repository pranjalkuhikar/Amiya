import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import cartReducer from "../features/cartSlice";
import themeReducer from "../features/themeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
