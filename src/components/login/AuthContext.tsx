import type { ReactNode } from 'react';
import React, { useContext, useEffect, useState } from 'react';

import setAuth from '../../utils/sendLoginData';
import type { LoginFormValues } from './LoginForm';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (values: LoginFormValues) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  login() {},
  logout() {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const customerId = localStorage.getItem('customerId');
    if (customerId) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const login = async (values: LoginFormValues) => {
    const response = await setAuth(values);
    if (response.customer.email !== null || response.customer.email === '') {
      localStorage.setItem('customerId', response.customer.id);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('customerId');
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
