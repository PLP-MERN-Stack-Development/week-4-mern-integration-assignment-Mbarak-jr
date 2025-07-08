import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PostForm from '../../components/posts/PostForm';
import Button from '../../components/common/Button';
import { getPostById, updatePost } from '../../services/postService';
import categoryService from '../../services/categoryService'; // ✅ fixed
import { uploadImage } from '../../services/uploadService';

export default function EditPost() {
  const { id } = useParams();
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
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [post, categories] = await Promise.all([
          getPostById(id),
          categoryService.getAllCategories()
        ]);

        if (post.author._id !== user.id && post.author !== user.id) {
          throw new Error('You are not authorized to edit this post');
        }

        setPostData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          category: post.category._id || post.category,
          tags: post.tags ? post.tags.join(', ') : '',
          isPublished: post.isPublished,
          featuredImage: post.featuredImage || '',
        });

        setCategories(categories);
      } catch (error) {
        setError(error.message || 'Failed to load post data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

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

      const updatedPost = {
        ...postData,
        tags: tagsArray,
      };

      await updatePost(id, updatedPost);
      navigate('/dashboard/posts');
    } catch (error) {
      setError(error.message || 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

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
        isEditMode={true}
      />
    </div>
  );
}
