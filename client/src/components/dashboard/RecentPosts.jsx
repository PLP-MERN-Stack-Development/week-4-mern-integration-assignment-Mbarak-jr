import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getPosts } from '../../services/postService';
import Button from '../common/Button';

const RecentPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const data = await getPosts({ author: user.id });
        setPosts(data.posts.slice(0, 3)); // show only 3 recent
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchUserPosts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg mt-6 p-4 text-center text-gray-500">
        Loading recent posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg mt-6 p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg mt-6 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Posts</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {posts.length === 0 ? (
          <div className="px-4 py-6 text-center text-gray-500">
            You haven't created any posts yet.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <Link
                  to={`/posts/${post.slug || post._id}`}
                  className="text-sm font-medium text-amber-600 hover:text-amber-500 truncate"
                >
                  {post.title}
                </Link>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {post.views || 0} views
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    {post.likes || 0} likes
                  </p>
                  {post.comments?.length > 0 && (
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

      <div className="bg-gray-50 px-4 py-4 sm:px-6 text-right">
        <Link
          to="/posts"
          className="text-sm font-medium text-amber-600 hover:text-amber-500"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default RecentPosts;
