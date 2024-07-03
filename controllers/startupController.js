const Startup = require('../models/Startup');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

// Create a new startup
exports.createStartup = async (req, res) => {
  try {
    const startup = new Startup({ ...req.body, founder: req.user._id });
    await startup.save();
    res.status(201).send(startup);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get all startups
exports.getStartups = async (req, res) => {
  try {
    const startups = await Startup.find({});
    res.send(startups);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get a specific startup by ID
exports.getStartupById = async (req, res) => {
  const _id = req.params.id;
  try {
    const startup = await Startup.findById(_id);
    if (!startup) {
      return res.status(404).send();
    }
    res.send(startup);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Update a specific startup by ID
exports.updateStartup = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'website', 'foundingDate', 'email'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const startup = await Startup.findOne({ _id: req.params.id, founder: req.user._id });
    if (!startup) {
      return res.status(404).send();
    }

    updates.forEach(update => (startup[update] = req.body[update]));
    await startup.save();
    res.send(startup);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Delete a specific startup by ID
exports.deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findOneAndDelete({ _id: req.params.id, founder: req.user._id });
    if (!startup) {
      return res.status(404).send();
    }
    res.send(startup);
  } catch (error) {
    errorHandler(res, error);
  }
};
