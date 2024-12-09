import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "./productSlice";

const initialState: ProductType = {
  id: 31,
  title: "",
  price: "",
  description: "",
  imageUrl: "",
  thumbnail: "",
};

export const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<ProductType>) => {
      return { ...state, ...action.payload, id: state.id };
    },
    incrementId: (state) => {
      state.id += 1;
    },
  },
});

export const { setForm, incrementId } = newProductSlice.actions;

export default newProductSlice.reducer;
