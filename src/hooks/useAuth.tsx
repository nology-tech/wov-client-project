import { useContext } from "react";
import { AuthContextProps } from "../context/AuthProvider/AuthProvider";
import { AuthContext } from "../context/AuthProvider/AuthProvider";

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
