import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getPosts, deletePost } from '../../services/postService';
import Button from '../../components/common/Button';

const AllPostsPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts({ author: user.id });
        setPosts(data.posts);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const confirmDelete = async () => {
    try {
      await deletePost(confirmingDelete._id);
      setPosts(prev => prev.filter(post => post._id !== confirmingDelete._id));
      setConfirmingDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete post');
    }
  };

  if (loading) return <div className="text-center py-8">Loading posts...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Posts</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">All Your Posts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {posts.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">
              You haven't created any posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <Link
                    to={`/posts/${post.slug || post._id}`}
                    className="text-sm font-medium text-amber-600 hover:text-amber-500 truncate"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link to={`/posts/${post._id}/edit`}>
                      <Button className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-3 py-1">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setConfirmingDelete(post)}
                      className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {post.views || 0} views
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {post.likes || 0} likes
                    </p>
                    {post.comments && (
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        {post.comments.length} comments
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>Created on {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ Centered Back to Dashboard Button */}
      <div className="flex justify-center mt-8">
        <Link to="/dashboard">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2">
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Confirmation Modal */}
      {confirmingDelete && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-70 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h2>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete <strong>{confirmingDelete.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setConfirmingDelete(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPostsPage;
