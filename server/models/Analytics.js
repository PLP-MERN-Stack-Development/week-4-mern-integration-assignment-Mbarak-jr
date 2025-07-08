const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventType: {
    type: String,
    enum: ['view', 'like', 'share', 'comment'],
    required: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  referrer: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

// Indexes for faster querying
AnalyticsSchema.index({ post: 1 });
AnalyticsSchema.index({ eventType: 1 });
AnalyticsSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Analytics', AnalyticsSchema);