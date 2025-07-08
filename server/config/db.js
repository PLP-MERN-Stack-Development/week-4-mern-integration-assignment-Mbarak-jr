const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected to Atlas');
  } catch (err) {
    console.error('DB Connection Error:', err.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;