const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,           // ✅ Added
  addComment,
  getPostBySlug,
} = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { trackPostView } = require('../middleware/analyticsMiddleware');

// ✅ Create post (with image upload, auth required)
router.post('/', auth, upload.single('featuredImage'), createPost);

// ✅ Get all published posts (or all by author with query)
router.get('/', getAllPosts);

// ✅ Get post by ID (for editing in dashboard)
router.get('/id/:id', getPostById); // Place before slug to avoid conflict

// ✅ Delete post by ID (only by author)
router.delete('/:id', auth, deletePost); // ✅ Requires auth

// ✅ Add comment to post (auth required)
router.post('/:id/comments', auth, addComment);

// ✅ Get post by slug (with analytics tracking)
router.get('/:slug', trackPostView, getPostBySlug);

module.exports = router;
