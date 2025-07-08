import React from 'react';
import { Link } from 'react-router-dom';

const CreatePostButton = () => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Create new content</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Start writing a new blog post or create a different type of content.</p>
        </div>
        <div className="mt-5">
          <Link
            to="/posts/create"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Create New Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePostButton;