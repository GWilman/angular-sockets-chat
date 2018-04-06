const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'User is required.' },
  content: { type: String, required: 'Message content is required.' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
