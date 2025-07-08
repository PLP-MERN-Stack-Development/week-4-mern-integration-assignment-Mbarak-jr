const Analytics = require('../models/Analytics');
const Post = require('../models/Post');

// ✅ Get Monthly Analytics (views + likes grouped by month)
exports.getMonthlyPostAnalytics = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const events = await Analytics.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`)
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            eventType: '$eventType'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.month',
          events: {
            $push: {
              eventType: '$_id.eventType',
              count: '$count'
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          month: '$_id',
          views: {
            $sum: {
              $map: {
                input: '$events',
                as: 'e',
                in: { $cond: [{ $eq: ['$$e.eventType', 'view'] }, '$$e.count', 0] }
              }
            }
          },
          likes: {
            $sum: {
              $map: {
                input: '$events',
                as: 'e',
                in: { $cond: [{ $eq: ['$$e.eventType', 'like'] }, '$$e.count', 0] }
              }
            }
          }
        }
      }
    ]);

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const filledData = MONTHS.map((name, index) => {
      const found = events.find(e => e.month === index + 1);
      return {
        month: name,
        views: found?.views || 0,
        likes: found?.likes || 0
      };
    });

    res.status(200).json(filledData);
  } catch (err) {
    console.error('Error in getMonthlyPostAnalytics:', err);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
};

// ✅ Like Post Handler (with duplicate check)
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id || null;
    const ipAddress = req.ip;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Prevent duplicate likes
    const existingLike = await Analytics.findOne({
      post: postId,
      eventType: 'like',
      ...(userId ? { user: userId } : { ipAddress })
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You already liked this post' });
    }

    // Record like in analytics
    await Analytics.create({
      post: postId,
      eventType: 'like',
      user: userId,
      ipAddress,
      userAgent: req.get('User-Agent')
    });

    // Increment post's like count
    post.likes += 1;
    await post.save();

    res.status(200).json({ message: 'Post liked', likes: post.likes });
  } catch (err) {
    console.error('Error in likePost:', err);
    res.status(500).json({ message: 'Failed to like post' });
  }
};
