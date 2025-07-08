import React from 'react';
import Button from '../common/Button';

function PostForm({
  postData,
  categories,
  isLoading,
  handleChange,
  handleImageUpload,
  handleSubmit,
  isEditMode,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={postData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={postData.excerpt}
          onChange={handleChange}
          rows={3}
          maxLength={200}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={postData.content}
          onChange={handleChange}
          required
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={postData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={postData.tags}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
        />
      </div>

      <div>
        <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>
        <input
          type="file"
          id="featuredImage"
          name="featuredImage"
          onChange={handleImageUpload}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
        />
        {postData.featuredImage && (
          <div className="mt-2">
            <img 
              src={postData.featuredImage} 
              alt="Preview" 
              className="h-40 object-cover rounded"
            />
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublished"
          name="isPublished"
          checked={postData.isPublished}
          onChange={handleChange}
          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
          Publish immediately
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          onClick={() => window.history.back()}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
        >
          {isLoading ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;