'use client'
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const CustomProvider = ({ children }) => {
  // Use this to track client-side hydration
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only attempt to use PersistGate on the client
  return (
    <Provider store={store}>
      {isClient ? (
        <PersistGate loading={null} persistor={persistStore(store)}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
};

export default CustomProvider;