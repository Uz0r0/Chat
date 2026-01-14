import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// import chatReducer from "./chatSlice";
// import groupReducer from "./groupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // chat: chatReducer,
    // group: groupReducer,
  },
});
