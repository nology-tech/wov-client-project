import React, { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";

type AuthContextProps = {
  isAuthenticated: boolean;
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ error: null | string }>;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ error: null | string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const accessToken = await userCredential.user.getIdToken();
      const userUID = userCredential.user.uid;
      localStorage.setItem("accessToken", (accessToken));
      localStorage.setItem("userUID", (userUID));
      setIsAuthenticated(true);
      navigate("/", {state: {userUID}})
    } catch (error) {
      const errorCode = (error as AuthError).code;
      if (errorCode === "auth/invalid-credential") {
        return { error: "Invalid email/password" };
      } else {
        return {
          error: "Oops, something went wrong. Try again in a few minutes",
        };
      }
    }
    return { error: null };
  };
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
