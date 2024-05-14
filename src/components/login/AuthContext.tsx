import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

import setAuth from '../../utils/sendLoginData';
import type { LoginFormValues } from './LoginForm';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (values: LoginFormValues) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (values: LoginFormValues) => {
    setAuth(values);
    console.log('user entered with values:', values);
    setIsAuthenticated(true);
  };

  //   const logout = (values: LoginFormValues) => {
  //     setAuth(values);
  //     console.log('user entered with values:', values);
  //     setIsAuthenticated(false);
  //   };

  return <AuthContext.Provider value={{ isAuthenticated, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
