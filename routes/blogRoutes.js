const express = require('express');
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);

// Protected routes
router.post('/', auth, blogController.createBlog);
router.put('/:id', auth, blogController.updateBlog);
router.post('/:id/like', auth, blogController.likeBlog);
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;
