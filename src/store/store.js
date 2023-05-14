import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "../reducers/notifyReducer";

const store = configureStore({
  reducer: {
    notification: notifyReducer,
  },
});

export default store;
