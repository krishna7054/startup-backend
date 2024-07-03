const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    if (req.file) {
      user.profilePicture = req.file.path;
    }
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Logout user from the current session
exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    errorHandler(res, error);
  }
};

// Logout user from all sessions
exports.logoutUserAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  const user = req.user.toObject();
  if (user.profilePicture) {
    user.profilePicture = `http://localhost:5000/${user.profilePicture.replace(/\\/g, '/')}`;
  }
  res.send(user);
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'profession', 'profilePicture'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    if (req.file) {
      req.user.profilePicture = req.file.path;
    }
    await req.user.save();
    
    const updatedUser = req.user.toObject();
    if (updatedUser.profilePicture) {
      updatedUser.profilePicture = `http://localhost:5000/${updatedUser.profilePicture.replace(/\\/g, '/')}`;
    }
    
    res.send(updatedUser);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const userObject = user.toObject();
    if (userObject.profilePicture) {
      userObject.profilePicture = `http://localhost:5000/${userObject.profilePicture.replace(/\\/g, '/')}`;
    }
    res.send(userObject);
  } catch (error) {
    errorHandler(res, error);
  }
};