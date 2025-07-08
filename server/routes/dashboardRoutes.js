const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth'); // ✅ default import

const { getDashboardStats } = require('../controllers/dashboardController');

router.route('/stats').get(protect, getDashboardStats);

module.exports = router;
