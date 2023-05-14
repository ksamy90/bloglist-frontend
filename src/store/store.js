import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "../reducers/notifyReducer";
import errorReducer from "../reducers/errorReducer";

const store = configureStore({
  reducer: {
    notification: notifyReducer,
    errorNote: errorReducer,
  },
});

export default store;
