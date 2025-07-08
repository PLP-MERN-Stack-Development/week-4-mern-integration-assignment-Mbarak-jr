const Post = require('../models/Post');
const Analytics = require('../models/Analytics');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's posts count
    const postCount = await Post.countDocuments({ author: userId });
    
    // Get published posts count
    const publishedPostCount = await Post.countDocuments({ 
      author: userId,
      isPublished: true 
    });

    // Get total views
    const totalViews = await Analytics.countDocuments({
      eventType: 'view',
      post: { $in: await Post.find({ author: userId }).distinct('_id') }
    });

    // Get recent posts (last 5)
    const recentPosts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title viewCount isPublished createdAt slug')
      .populate('category', 'name');

    // Get analytics data for chart (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const analyticsData = await Analytics.aggregate([
      {
        $match: {
          eventType: 'view',
          post: { $in: await Post.find({ author: userId }).distinct('_id') },
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        postCount,
        publishedPostCount,
        totalViews,
        recentPosts,
        analyticsData
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};