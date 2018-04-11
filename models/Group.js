const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

groupSchema
  .virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'group'
  });

groupSchema.set({ virtuals: true });

module.exports = mongoose.model('Group', groupSchema);
