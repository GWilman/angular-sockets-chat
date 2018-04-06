const mongoose   = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const { dbURI } = require('../config/environment');

const User = require('../models/User');
const Message = require('../models/Message');
const Group = require('../models/Group');

const userData = require('./data');

mongoose.connect(dbURI);

User.collection.drop();
Message.collection.drop();
Group.collection.drop();

let users = [];
let messages = [];

User
  .create(userData)
  .then(data => {
    console.log(`${data.length} users created`);
    users = data;
    return Message.create([{
      user: users[0],
      content: 'Welcome to my chat app!'
    }]);
  })
  .then(data => {
    console.log(`${data.length} messages created`);
    messages = data;
  })
  .then(() => {
    return Group.create([{
      name: 'WDI-LDN-32',
      owner: users[0],
      users: users,
      messages: messages
    }]);
  })
  .then(groups => console.log(`${groups.length} groups created`))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());
