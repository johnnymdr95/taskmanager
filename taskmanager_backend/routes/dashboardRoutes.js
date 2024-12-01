// dashboardRoutes.js
const express = require('express');
const { getDashboardStats } = require('../controllers/DashboardController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/stats', authenticate, getDashboardStats);

module.exports = router;
