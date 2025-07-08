const express = require('express');
const router = express.Router();
const {
  getActiveHeroSections,
  createHeroSection,
  updateHeroSection,
  deleteHeroSection
} = require('../controllers/heroSectionController');

// Protect routes with authentication middleware if needed
// const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getActiveHeroSections);

// Protected admin routes
// router.post('/', protect, admin, createHeroSection);
// router.put('/:id', protect, admin, updateHeroSection);
// router.delete('/:id', protect, admin, deleteHeroSection);

// For now, keep routes unprotected for Postman testing
router.post('/', createHeroSection);
router.put('/:id', updateHeroSection);
router.delete('/:id', deleteHeroSection);

module.exports = router;