const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix CORS for frontend at localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Dev logger
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Routes
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('🚀 MERN Blog API is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

// Start server only after DB is connected
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

// Handle unhandled promises
process.on('unhandledRejection', (err) => {
  console.error('❗ Unhandled Promise Rejection:', err);
  process.exit(1);
});

startServer();

module.exports = app;
