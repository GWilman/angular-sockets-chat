const Message = require('../models/Message');

function messagesIndex(req, res, next) {
  Message
    .find()
    .then(messages => res.status(200).json(messages))
    .catch(next);
}

module.exports = {
  index: messagesIndex
};
