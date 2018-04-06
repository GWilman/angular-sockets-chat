const User = require('../models/User');

function usersIndex(req, res, next) {
  User
    .find()
    .then(users => res.status(200).json(users))
    .catch(next);
}

module.exports = {
  index: usersIndex
};
