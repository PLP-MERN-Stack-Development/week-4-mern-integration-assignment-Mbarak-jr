const Analytics = require('../models/Analytics');

// Track post views
exports.trackPostView = async (req, res, next) => {
  try {
    if (req.params.slug) {
      const post = await Post.findOne({ slug: req.params.slug });
      
      if (post) {
        // Record the view in analytics
        await Analytics.create({
          post: post._id,
          user: req.user?.id,
          eventType: 'view',
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          referrer: req.get('Referrer')
        });

        // Increment view count on the post
        post.viewCount += 1;
        await post.save();
      }
    }
    next();
  } catch (err) {
    console.error('Analytics tracking error:', err);
    next(); // Don't block the request if analytics fails
  }
};