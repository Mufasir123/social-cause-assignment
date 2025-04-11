'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store)
const CustomProvider = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {children}
      </PersistGate>
    </Provider>
  )
}

export default CustomProvider
