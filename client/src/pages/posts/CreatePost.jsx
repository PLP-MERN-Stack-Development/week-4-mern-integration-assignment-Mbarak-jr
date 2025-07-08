import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PostForm from '../../components/posts/PostForm';
import Button from '../../components/common/Button';
import { createPost } from '../../services/postService';
import categoryService from '../../services/categoryService'; // ✅ fixed import
import { uploadImage } from '../../services/uploadService';

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    isPublished: false,
    featuredImage: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories(); // ✅ fixed method usage
        setCategories(data);
      } catch {
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const imageUrl = await uploadImage(file);
      setPostData(prev => ({ ...prev, featuredImage: imageUrl }));
    } catch {
      setError('Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsLoading(true);
      const tagsArray = postData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      const newPost = {
        ...postData,
        tags: tagsArray,
        author: user.id,
      };

      await createPost(newPost);
      navigate('/dashboard/posts');
    } catch (error) {
      setError(error.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <PostForm
        postData={postData}
        categories={categories}
        isLoading={isLoading}
        handleChange={handleChange}
        handleImageUpload={handleImageUpload}
        handleSubmit={handleSubmit}
        isEditMode={false}
      />
    </div>
  );
}
