const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  investmentFields: { type: String, required: true },
  investmentAmount: { type: Number, required: true },
  email: { type: String, required: true },
 
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});

const Investor = mongoose.model('Investor', investorSchema);

module.exports = Investor;
