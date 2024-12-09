import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slices/productSlice";
import newProductSlice from "./Slices/newProductSlice";
import editProductSlice from "./Slices/editProductSlice";
import replaceProductSlice from "./Slices/replaceProductSlice";

export const store = configureStore({
  reducer: {
    productSlice,
    newProductSlice,
    editProductSlice,
    replaceProductSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
