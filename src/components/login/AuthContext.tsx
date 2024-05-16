import type { ReactNode } from 'react';
import React, { useContext, useState } from 'react';

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
  // username: '',
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (values: LoginFormValues) => {
    const response = await setAuth(values);
    if (response.customer.email !== null || response.customer.email === '') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    // console.log('user entered with values:', values);
    // setIsAuthenticated(true);
  };

  const logout = () => {
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
