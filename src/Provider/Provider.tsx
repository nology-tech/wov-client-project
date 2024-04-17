import React, { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase";

type AuthContextProps = {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const accessToken = localStorage
  // if(!accessToken) {
  // setIsAuthenticated(false)
  // } else {
  //   setIsAuthenticated(true)
  // }
  useEffect(() => {
    if (localStorage.getItem("userUID")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const loginUser = () => {};
  const logoutUser = () => {};

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
