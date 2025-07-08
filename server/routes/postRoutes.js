// === routes/postRoutes.js ===
const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  addComment,
  getPostBySlug,
} = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { trackPostView } = require('../middleware/analyticsMiddleware');

router.post('/', auth, upload.single('featuredImage'), createPost);
router.get('/', getAllPosts);
router.get('/id/:id', getPostById);
router.delete('/:id', auth, deletePost);
router.post('/:id/comments', auth, addComment);
router.get('/:slug', trackPostView, getPostBySlug);

module.exports = router;