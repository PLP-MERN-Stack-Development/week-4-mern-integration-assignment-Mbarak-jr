// === services/postService.js ===
import api from '../utils/api';

export const getPosts = async (params = {}) => {
  const response = await api.get('/posts', { params });
  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/id/${id}`);
  return response.data.post;
};

export const getPostBySlug = async (slug) => {
  const response = await api.get(`/posts/${slug}`);
  return response.data.post;
};

export const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const addComment = async (postId, content) => {
  const response = await api.post(`/posts/${postId}/comments`, { content });
  return response.data;
};
