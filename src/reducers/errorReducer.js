import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    showError(_state, action) {
      return action.payload;
    },
  },
});

export const { showError } = errorSlice.actions;

export default errorSlice.reducer;
