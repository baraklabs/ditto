const express = require('express');
const { getAllUserProfile, getUserProfile, updateUserProfile, createUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Protected Routes (Token Required)
router.get('/profile/all', authenticateToken, getAllUserProfile); // Fetch All user profile 
router.get('/profile', authenticateToken, getUserProfile); // Fetch user profile
router.post('/profile', authenticateToken, createUserProfile); // Fetch user profile
router.put('/profile', authenticateToken, updateUserProfile); // Update user profile
module.exports = router;
