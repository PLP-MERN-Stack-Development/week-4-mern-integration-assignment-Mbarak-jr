import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import api from '../../utils/api'

const CommentSection = ({ postId }) => {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/posts/${postId}/comments`)
        setComments(res.data)
      } catch (err) {
        console.error('Failed to load comments:', err)
        setError('Failed to load comments')
      }
    }

    fetchComments()
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError(null)
    try {
      const res = await api.post(`/posts/${postId}/comments`, { content })
      setComments((prev) => [res.data, ...prev])
      setContent('')
    } catch (err) {
      console.error('Failed to submit comment:', err)
      setError('Failed to submit comment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
            rows="3"
            required
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p className="text-gray-600">You must be logged in to comment.</p>
      )}

      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment._id} className="border-b pb-2">
            <p className="font-semibold">{comment.author?.username || 'Anonymous'}</p>
            <p className="text-gray-800">{comment.content}</p>
            <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentSection
