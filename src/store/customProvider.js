'use client'
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const CustomProvider = ({ children }) => {
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    const _persistor = persistStore(store);
    setPersistor(_persistor);
  }, []);

  if (!persistor) return null; // or a loading spinner

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default CustomProvider;
