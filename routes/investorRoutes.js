const express = require('express');
const Investor = require('../models/Investor');
const auth = require('../middleware/auth');
const router = express.Router();
const {
  createInvestor,
  getInvestors,
  getInvestorById,
  updateInvestor,
  deleteInvestor,
} = require('../controllers/investorController');

// POST /investors - Create a new investor
router.post('/', auth, createInvestor);

// GET /investors - Get all investors
router.get('/', getInvestors);

// GET /investors/:id - Get a specific investor by ID
router.get('/:id', getInvestorById);

// PATCH /investors/:id - Update a specific investor by ID
router.patch('/:id', auth, updateInvestor);

// DELETE /investors/:id - Delete a specific investor by ID
router.delete('/:id', auth, deleteInvestor);

module.exports = router;
