import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (user, password) => {
    setIsLoading(true);
    if (user === "admin" && password === "123123") {
      //fake data
      const fakeFetchData = {
        name: "Dusk",
        age: 23,
        gender: "male",
        token: "jwtEncode",
      };
      setUserInfo(fakeFetchData);
      setUserToken(fakeFetchData.token);

      AsyncStorage.setItem("userInfo", JSON.stringify(fakeFetchData));
      AsyncStorage.setItem("userToken", fakeFetchData.token);
    } else {
      console.log("error");
    }
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserInfo(null);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setUserToken(userToken);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("📢 [AuthContext.js:42]", error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
