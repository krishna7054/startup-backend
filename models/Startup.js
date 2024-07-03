const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  foundingDate: { type: Date, default: Date.now },
  email: { type: String, required: true },
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;
