const ErrorResponse = require('../utils/ErrorResponse');

// Handle Mongoose validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message);
  return new ErrorResponse(`Validation failed: ${errors.join(', ')}`, 400);
};

// Centralized error handler
module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Handle specific error types
  if (err.name === 'ValidationError') error = handleValidationError(err);
  if (err.code === 11000) error = new ErrorResponse('Duplicate field value', 400);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};