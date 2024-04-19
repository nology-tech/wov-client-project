import { useContext } from "react";
import { AuthContextProps } from "../components/AuthProvider/AuthProvider";
import { AuthContext } from "../components/AuthProvider/AuthProvider";

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
