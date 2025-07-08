const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.post('/', auth, createCategory); // Admin-only
router.get('/', getCategories);

module.exports = router;