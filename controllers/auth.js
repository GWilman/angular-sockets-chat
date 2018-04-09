const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/User');

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => {
      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '24hr' });
      return res.json({ message: `Welcome ${user.username}!`, token, user });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Invalid Credentials.' });

      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '24hr' });
      return res.json({ message: `Welcome back ${user.username}!`, token, user });
    })
    .catch(next);
}

module.exports = {
  login,
  register
};
