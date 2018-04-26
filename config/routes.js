const router = require('express').Router();

const auth = require('../controllers/auth');
const users = require('../controllers/users');
const messages = require('../controllers/messages');
const groups = require('../controllers/groups');

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(auth.register);

router.route('/users')
  .get(users.index);

router.route('/messages')
  .get(messages.index)
  .post(messages.create);

router.route('/messages/:id')
  .put(messages.edit)
  .delete(messages.delete);

router.route('/groups')
  .get(groups.index);

router.route('/groups/:id')
  .get(groups.show);

router.route('/*')
  .all((req, res) => res.sendStatus(404));

module.exports = router;
