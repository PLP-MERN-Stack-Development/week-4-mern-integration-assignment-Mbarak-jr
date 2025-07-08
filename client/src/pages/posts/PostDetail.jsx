import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { getPostBySlug, deletePost } from '../../services/postService';
import CommentForm from '../../components/posts/CommentForm';
import { formatDate } from '../../utils/formatDate';

export default function PostDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deletePost(post._id);
      navigate('/dashboard/posts');
    } catch (err) {
      setError(err.message || 'Failed to delete post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!post) return <div>Post not found</div>;

  const isAuthor = user && (user.id === post.author._id || user.id === post.author);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose prose-amber max-w-none">
        {post.featuredImage && (
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        
        <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
          <span>By {post.author.username}</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
          {post.category && (
            <>
              <span>•</span>
              <Link 
                to={`/categories/${post.category._id}`} 
                className="text-amber-600 hover:underline"
              >
                {post.category.name}
              </Link>
            </>
          )}
        </div>

        <div className="mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {isAuthor && (
          <div className="flex space-x-4 mb-8">
            <Link to={`/posts/${post._id}/edit`}>
              <Button variant="outline" className="border-amber-400 text-amber-400">
                Edit Post
              </Button>
            </Link>
            <Button 
              onClick={handleDelete}
              variant="outline" 
              className="border-red-400 text-red-400"
            >
              Delete Post
            </Button>
          </div>
        )}
      </article>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        
        {user ? (
          <CommentForm postId={post._id} />
        ) : (
          <p className="text-gray-500 mb-4">
            <Link to="/login" className="text-amber-600 hover:underline">Log in</Link> to leave a comment
          </p>
        )}

        <div className="space-y-4 mt-6">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map(comment => (
              <div key={comment._id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{comment.user.username}</h3>
                    <p className="text-gray-500 text-sm">{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
                <p className="mt-2">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}