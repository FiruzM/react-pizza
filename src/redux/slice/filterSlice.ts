import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  categoryID: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: CounterState = {
  categoryID: 0,
  sort: {
    name: "популярности(DESC)",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryID = action.payload;
    },
    setSort: (state, action: PayloadAction<CounterState["sort"]>) => {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
