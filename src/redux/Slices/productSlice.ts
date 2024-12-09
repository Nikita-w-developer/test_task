import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductApiResponse {
  products: ProductType[];
}

export const fetchProduct = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const url = "https://dummyjson.com/products";
    const { data } = await axios.get<ProductApiResponse>(url);

    return data.products;
  }
);

export type ProductType = {
  id: number;
  title: string;
  price: string;
  thumbnail: string;
  imageUrl: string;
  description: string;
};

type sortPropert = { name: string; property: string };

interface ProductSlice {
  items: ProductType[];
  isLiked: ProductType[];
  sort: sortPropert;
  currentId: number;
  searchValue: string;
}

const initialState: ProductSlice = {
  items: (() => {
    try {
      const storedItems = localStorage.getItem("productItems");
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Error parsing products from localStorage", error);
      return [];
    }
  })(),
  isLiked: [],
  sort: { name: "Все товары", property: "all" },
  currentId: 1,
  searchValue: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    replacedItem: (state, action: PayloadAction<ProductType[]>) => {
      const updatedProducts = action.payload;
      state.items = updatedProducts;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setNewItem: (state, action: PayloadAction<ProductType>) => {
      state.items.push(action.payload);
      localStorage.setItem("productItems", JSON.stringify(state.items));
    },
    setCurrentId: (state, action: PayloadAction<number>) => {
      state.currentId = action.payload;
    },
    addFavourite: (state, action: PayloadAction<ProductType>) => {
      const existing = state.isLiked.find(
        (obj) => obj.id === action.payload.id
      );
      if (existing) {
        state.isLiked = state.isLiked.filter(
          (obj) => obj.id !== action.payload.id
        );
      } else {
        state.isLiked.push(action.payload);
      }
    },

    removeItem: (state, action: PayloadAction<ProductType>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.isLiked = state.isLiked.filter(
        (liked) => liked.id !== action.payload.id
      );
    },
    setSort: (state, action: PayloadAction<sortPropert>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProduct.fulfilled,
      (state, action: PayloadAction<ProductType[]>) => {
        state.items.push(...action.payload);
        state.items = state.items.flat();
        localStorage.setItem("productItems", JSON.stringify(state.items));
      }
    );
  },
});

export const {
  addFavourite,
  removeItem,
  setSort,
  setCurrentId,
  setNewItem,
  setSearchValue,
  replacedItem,
} = productSlice.actions;

export default productSlice.reducer;
