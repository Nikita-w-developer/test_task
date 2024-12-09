import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "./productSlice";
const initialState = {
  id: 0,
  title: "",
  price: "",
  description: "",
  imageUrl: "",
  thumbnail: "",
};

export const editProductSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<ProductType>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setParams } = editProductSlice.actions;

export default editProductSlice.reducer;
