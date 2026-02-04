const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// @route POST /api/v1/auth/signup
router.post('/signup', signup);

// @route POST /api/v1/auth/login
router.post('/login', login);

module.exports = router;