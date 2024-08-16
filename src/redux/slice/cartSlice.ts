import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ItemTypes = {
  title: string;
  imageUrl: string;
  price: number;
  id: string;
  count: number;
  type: string | number;
  size: string | number;
};
export interface CartState {
  totalPrice: number;
  items: ItemTypes[];
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemTypes>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem: (state, action) => {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem?.count === 1) {
        state.items = state.items.filter((item) => item.id !== findItem.id);
      }

      // @ts-expect-error undefined fintItem
      findItem.count--;

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
