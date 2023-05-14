import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    createNotify(_state, action) {
      return action.payload;
    },
    showError(_state, action) {
      return action.payload;
    },
  },
});

export const { createNotify, showError } = notifySlice.actions;

export default notifySlice.reducer;
