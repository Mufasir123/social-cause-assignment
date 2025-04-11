import contentSlice from "./contentSlice/contentSlice";
import userSlice from "./userSlice/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit"

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({
    content: contentSlice,
    user: userSlice,
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});
export default store;