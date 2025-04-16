// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import contentSlice from "./contentSlice/contentSlice";
import userSlice from "./userSlice/userSlice";

const rootReducer = combineReducers({
  content: contentSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
