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

function messagesEdit(req, res, next) {
  Message
    .findByIdAndUpdate(req.params.id, req.body)
    .then(message => res.status(200).json(message))
    .catch(next);
}

function messagesDelete(req, res, next) {
  Message
    .findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: messagesIndex,
  create: messagesCreate,
  edit: messagesEdit,
  delete: messagesDelete
};
