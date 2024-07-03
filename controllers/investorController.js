const Investor = require('../models/Investor');
const errorHandler = require('../utils/errorHandler');

// Create a new investor
exports.createInvestor = async (req, res) => {
  try {
    const investor = new Investor({ ...req.body, investor: req.user._id });
    await investor.save();
    res.status(201).send(investor);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get all investors
exports.getInvestors = async (req, res) => {
  try {
    const investors = await Investor.find({});
    res.send(investors);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get a specific investor by ID
exports.getInvestorById = async (req, res) => {
  const _id = req.params.id;
  try {
    const investor = await Investor.findById(_id);
    if (!investor) {
      return res.status(404).send();
    }
    res.send(investor);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Update a specific investor by ID
exports.updateInvestor = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'investmentFields', 'investmentAmount', 'email'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const investor = await Investor.findOne({ _id: req.params.id, investor: req.user._id });
    if (!investor) {
      return res.status(404).send();
    }

    updates.forEach(update => (investor[update] = req.body[update]));
    await investor.save();
    res.send(investor);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Delete a specific investor by ID
exports.deleteInvestor = async (req, res) => {
  try {
    const investor = await Investor.findOneAndDelete({ _id: req.params.id, investor: req.user._id });
    if (!investor) {
      return res.status(404).send();
    }
    res.send(investor);
  } catch (error) {
    errorHandler(res, error);
  }
};
