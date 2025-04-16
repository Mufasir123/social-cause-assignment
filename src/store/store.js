import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import contentSlice from "./contentSlice/contentSlice";
import userSlice from "./userSlice/userSlice";

// Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  content: contentSlice,
  user: userSlice,
});

// Wrap combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor (💡 important: do not create inside a component)
const persistor = persistStore(store);

// Export both
export { store, persistor };
