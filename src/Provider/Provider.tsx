import React, { createContext, useContext, useState } from 'react';

type AuthContextProps = {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const accessToken = localStorage
  // if(!accessToken) {
  // setIsAuthenticated(false)
  // } else {
  //   setIsAuthenticated(true)
  // }

  const loginUser = () => {
    // Perform authentication logic
    localStorage.getItem("accessToken")
  };

  const logoutUser = () => {
    // Perform logout logic
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
