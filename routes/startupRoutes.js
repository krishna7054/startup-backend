const express = require('express');
const Startup = require('../models/Startup');
const auth = require('../middleware/auth');
const router = express.Router();
const {
  createStartup,
  getStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
} = require('../controllers/startupController');

// POST /startups - Create a new startup
router.post('/startups', auth, createStartup);

// GET /startups - Get all startups
router.get('/startups', getStartups);

// GET /startups/:id - Get a specific startup by ID
router.get('/startups/:id', getStartupById);

// PATCH /startups/:id - Update a specific startup by ID
router.patch('/startups/:id', auth, updateStartup);

// DELETE /startups/:id - Delete a specific startup by ID
router.delete('/startups/:id', auth, deleteStartup);

module.exports = router;
