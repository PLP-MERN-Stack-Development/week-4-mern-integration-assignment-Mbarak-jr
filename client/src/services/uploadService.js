import api from '../utils/api';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.url;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to upload image');
  }
};