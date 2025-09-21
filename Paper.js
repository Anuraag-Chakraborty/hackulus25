const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paper', paperSchema);
