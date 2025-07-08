import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import PostList from '../../components/posts/PostList';
import Button from '../../components/common/Button';
import { getPosts } from '../../services/postService';
import { deletePost } from '../../services/postService';
import { Link } from 'react-router-dom';

export default function UserPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts({ author: user.id });
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError(err.message || 'Failed to delete post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Posts</h1>
        <Link to="/posts/create">
          <Button className="bg-amber-600 hover:bg-amber-700">
            Create New Post
          </Button>
        </Link>
      </div>

      <PostList 
        posts={posts} 
        onDelete={handleDelete} 
        currentUserId={user.id} 
      />
    </div>
  );
}