const Category = require('../models/Category');

// Create a new category (Admin-only)
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ error: 'Category already exists' });
    }

    const category = await Category.create({ name: name.trim() });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};
