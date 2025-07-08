// src/services/analyticsService.js
import api from '../utils/api';

export const getMonthlyAnalytics = async () => {
  try {
    const response = await api.get('/analytics/posts/monthly');
    return response.data; // ✅ your backend returns filled array directly
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to fetch analytics');
  }
};

export const trackPostView = async (slug) => {
  try {
    await api.post(`/analytics/view/${slug}`);
  } catch (err) {
    console.error('Failed to track view:', err);
  }
};

export const trackPostLike = async (postId) => {
  const res = await api.post(`/analytics/like/${postId}`);
  return res.data;
};

export const checkIfLiked = async (postId) => {
  try {
    const res = await api.get(`/analytics/like/${postId}/status`);
    return res.data.liked;
  } catch (err) {
    console.error('Failed to check like status:', err);
    return false;
  }
};
