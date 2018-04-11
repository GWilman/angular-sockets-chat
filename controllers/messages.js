const Message = require('../models/Message');

function messagesIndex(req, res, next) {
  Message
    .find()
    .then(messages => res.status(200).json(messages))
    .catch(next);
}

function messagesCreate(req, res, next) {
  Message
    .create(req.body)
    .then(message => res.status(201).json(message))
    .catch(next);
}

module.exports = {
  index: messagesIndex,
  create: messagesCreate
};
