const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

// Multer setup for profile picture upload
const upload = multer({ dest: 'uploads/' });

// Register
router.post('/register', upload.single('profilePicture'), userController.registerUser);

// Login
router.post('/login', userController.loginUser);

// Get Profile
router.get('/me', auth, userController.getUserProfile);

// Get User by ID
router.get('/:id', auth, userController.getUserById);


// Update Profile
router.patch('/me', auth, upload.single('profilePicture'), userController.updateUserProfile);

module.exports = router;
