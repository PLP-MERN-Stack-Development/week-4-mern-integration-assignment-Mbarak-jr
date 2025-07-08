import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import authService from '../services/authService';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser(); // ✅ Await this
        setUser(userData);
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      await authService.register(userData);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      throw err;
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
