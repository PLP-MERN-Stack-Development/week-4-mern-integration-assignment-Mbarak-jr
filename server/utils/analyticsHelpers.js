const Analytics = require('../models/Analytics');

// Get popular posts
exports.getPopularPosts = async (limit = 5) => {
  return Analytics.aggregate([
    { $match: { eventType: 'view' } },
    {
      $group: {
        _id: '$post',
        viewCount: { $sum: 1 }
      }
    },
    { $sort: { viewCount: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: '_id',
        as: 'post'
      }
    },
    { $unwind: '$post' },
    {
      $project: {
        _id: '$post._id',
        title: '$post.title',
        slug: '$post.slug',
        viewCount: 1,
        featuredImage: '$post.featuredImage'
      }
    }
  ]);
};

// Get user engagement stats
exports.getUserEngagement = async (userId) => {
  return Analytics.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId)
      }
    },
    {
      $group: {
        _id: '$eventType',
        count: { $sum: 1 }
      }
    }
  ]);
};