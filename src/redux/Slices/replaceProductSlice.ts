import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface replaceSlice {
  id: number;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  thumbnail: string;
}

const initialState: replaceSlice = {
  id: 0,
  title: "",
  price: "",
  description: "",
  imageUrl: "",
  thumbnail: "",
};

const replaceProductSlice = createSlice({
  name: "replaceProduct",
  initialState,
  reducers: {
    setFormField: <I extends keyof replaceSlice>(
      state: replaceSlice,
      action: PayloadAction<{ field: I; value: replaceSlice[I] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setFormImage: (
      state: replaceSlice,
      action: PayloadAction<{ imageUrl: string }>
    ) => {
      state.thumbnail = action.payload.imageUrl;
    },
  },
});

export const { setFormField, setFormImage } = replaceProductSlice.actions;

export default replaceProductSlice.reducer;
