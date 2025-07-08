const express = require('express');
const router = express.Router();
const { getMonthlyPostAnalytics, likePost } = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// ✅ GET monthly analytics for views and likes
router.get('/posts/monthly', auth, getMonthlyPostAnalytics);

// ✅ POST like a post
router.post('/like/:postId', auth, likePost);

module.exports = router;
