import api from '../utils/api';
import { jwtDecode } from 'jwt-decode'; // ✅ fixed import

const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return this.getCurrentUser();
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('token', response.data.token);
    return this.getCurrentUser();
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token); // ✅ decode token to get user
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
};

export default authService;
