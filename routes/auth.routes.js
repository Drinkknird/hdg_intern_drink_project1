const express = require('express');
const router = express.Router();
const authController = require('../controllers/UserController');

router.post('/login', authController.login);

// ... other routes

module.exports = router;
