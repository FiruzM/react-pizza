import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizza = createAsyncThunk(
  "users/fetchStatus",
  async (params: Record<string, string | number>) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get(
      `https://65f191b8034bdbecc7630e6a.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data as ItemTypes[];
  }
);
type ItemTypes = {
  title: string;
  imageUrl: string;
  price: number;
  id: string;
  count: number;
  types: number[];
  sizes: number[];
};

export interface PizzaState {
  items: ItemTypes[];
  status: string;
}

const initialState: PizzaState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchPizza.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { addItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
