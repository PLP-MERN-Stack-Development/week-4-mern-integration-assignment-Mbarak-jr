import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    views: '1.2K',
    likes: '243',
    date: 'May 15, 2023',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Advanced Tailwind CSS Techniques',
    views: '856',
    likes: '187',
    date: 'May 10, 2023',
    status: 'Published',
  },
  {
    id: 3,
    title: 'Building a Blog with Next.js',
    views: '432',
    likes: '92',
    date: 'May 5, 2023',
    status: 'Draft',
  },
];

const RecentPosts = () => {
  return (
    <div className="bg-white shadow rounded-lg mt-6 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Posts</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <div key={post.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <Link
                to={`/posts/${post.id}`}
                className="text-sm font-medium text-amber-600 hover:text-amber-500 truncate"
              >
                {post.title}
              </Link>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {post.status}
              </span>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  {post.views} views
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  {post.likes} likes
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <p>Published on {post.date}</p>
              </div>
            </div>
          </div>
        ))}
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