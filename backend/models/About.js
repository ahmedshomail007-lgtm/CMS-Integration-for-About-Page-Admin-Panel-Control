const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  description: { type: String, required: true },
  mission: { type: String, required: true },
  vision: { type: String, required: true },
  image_url: { type: String },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', aboutSchema);