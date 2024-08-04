import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slice/filterSlice";
import cart from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
