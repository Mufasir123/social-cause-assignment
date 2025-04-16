"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { getUser } from "./userSlice/userSlice";
import { useRouter } from "next/navigation";

const CustomProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter()
  useEffect(()=>{
    setIsClient(true)
    const savedUser = localStorage.getItem("user")
    if(savedUser){
      const userData = JSON.parse(savedUser)
      store.dispatch(getUser(userData.user))
    }
  },[router.asPath])
  return <Provider store={store}>{isClient ? children : null}</Provider>;
};

export default CustomProvider;
