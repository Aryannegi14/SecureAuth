
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types';
import { backendApi } from '../services/mockBackend';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
    error: null,
  });

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await backendApi.getCurrentUser();
        if (response.success && response.data) {
          setState(prev => ({ ...prev, user: response.data!.user, accessToken: response.data!.token, isLoading: false }));
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (err) {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    const res = await backendApi.login(email, pass);
    if (res.success && res.data) {
      setState({
        user: res.data.user,
        accessToken: res.data.token,
        isLoading: false,
        error: null,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false, error: res.message || 'Login failed' }));
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    const res = await backendApi.register(name, email, pass);
    if (res.success && res.data) {
      setState({
        user: res.data.user,
        accessToken: res.data.token,
        isLoading: false,
        error: null,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false, error: res.message || 'Registration failed' }));
    }
  };

  const logout = () => {
    backendApi.logout();
    setState({ user: null, accessToken: null, isLoading: false, error: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
