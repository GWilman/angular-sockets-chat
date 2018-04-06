const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);
