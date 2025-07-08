const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
}, { timestamps: true });

// Auto-generate slug from name
CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w ]+/g, '') // remove special characters
      .replace(/ +/g, '-')     // replace spaces with dashes
  }
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
