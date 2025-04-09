import { configureStore } from "@reduxjs/toolkit";
import contentSlice from "./contentSlice/contentSlice";

const store = configureStore({
    reducer:{
        content:contentSlice
    }
});
export default store;