import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// ✅ Send token in Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // ✅ Match backend
  }
  return config;
});

// ✅ Handle token expiration or auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error;

    // Only redirect on actual token issues
    if (status === 401 && message === 'Invalid token') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error); // Let other errors (403, 404, etc.) pass through
  }
);

export default api;
