import api from '../utils/api';

// ✅ Get all posts with optional filters (e.g., author ID)
export const getPosts = async (params = {}) => {
  try {
    const response = await api.get('/posts', { params });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to fetch posts');
  }
};

// ✅ Get post by ID (uses /posts/id/:id)
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/id/${id}`); // ✅ correct route
    return response.data.post; // ✅ return post object directly
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to fetch post');
  }
};

// ✅ Get post by slug (public view)
export const getPostBySlug = async (slug) => {
  try {
    const response = await api.get(`/posts/${slug}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to fetch post');
  }
};

// ✅ Create a new post
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to create post');
  }
};

// ✅ Update a post by ID
export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to update post');
  }
};

// ✅ Delete a post by ID
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to delete post');
  }
};

// ✅ Add a comment to a post
export const addComment = async (postId, content) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to add comment');
  }
};
