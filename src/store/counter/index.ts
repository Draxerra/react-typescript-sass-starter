import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const asyncIncrement = createAsyncThunk(
  "counter/asyncIncrement",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return 1;
  }
);

export const counter = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncIncrement.fulfilled, (state, action) => {
      state.value += action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } = counter.actions;

export default counter.reducer;
