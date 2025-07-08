import { Link } from 'react-router-dom'
import { formatDate, truncateText } from '../../utils/helpers'

function PostCard({ post, onDelete }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {post.featuredImage && (
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">
            <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h3>
          {onDelete && (
            <button 
              onClick={() => onDelete(post._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          )}
        </div>
        <p className="text-gray-600 mb-3">{truncateText(post.content)}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{post.author?.name || 'Unknown author'}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard