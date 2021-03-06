const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'User is required.' },
  group: { type: mongoose.Schema.ObjectId, ref: 'Group', required: 'Group is required' },
  content: { type: String, required: 'Message content is required.' },
  isNotice: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
