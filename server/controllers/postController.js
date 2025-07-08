// === controllers/postController.js ===
const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, category, tags, isPublished, featuredImage } = req.body;
    let image = req.file?.filename || featuredImage;

    if (!image) {
      const keywords = tags
        ? tags.split(',').map(tag => tag.trim()).join(',')
        : title.replace(/\s+/g, ',');
      image = `https://source.unsplash.com/featured/?${encodeURIComponent(keywords)}`;
    }

    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    const post = await Post.create({
      title,
      content,
      excerpt,
      category,
      tags: tagsArray,
      featuredImage: image,
      isPublished,
      author: req.user.id,
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name');

    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const query = { isPublished: true };
    if (req.query.author) {
      query.author = req.query.author;
      delete query.isPublished;
    }

    const posts = await Post.find(query)
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

    await post.addComment(req.user.id, req.body.content);
    res.status(201).json({ success: true, message: 'Comment added' });
  } catch (err) {
    next(err);
  }
};

exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'username')
      .populate('category', 'name');

    if (!post || !post.isPublished)
      return res.status(404).json({ success: false, error: 'Post not found' });

    await post.incrementViewCount();
    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ success: false, error: 'Not authorized' });

    await post.deleteOne();
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};