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
let groups = [];

User
  .create(userData)
  .then(data => {
    console.log(`${data.length} users created`);
    users = data;
    return Group.create([{
      name: 'WDI-LDN-32',
      owner: users[0],
      users: users
    }, {
      name: 'WDI-LDN-33',
      owner: users[2],
      users: users
    }, {
      name: 'WDI-LDN-33',
      owner: users[2],
      users: users
    }, {
      name: 'GA Instructors',
      owner: users[1],
      users: users
    }, {
      name: 'WDI-LDN-30',
      owner: users[0],
      users: users
    }]);
  })
  .then(data => {
    groups = data;
    console.log(`${groups.length} groups created`);
  })
  .then(() => {
    return Message.create([{
      user: users[0],
      content: 'Welcome to my chat app!',
      group: groups[0]
    }, {
      user: users[1],
      content: 'Thanks for having me 👍🏻',
      group: groups[0]
    }, {
      user: users[2],
      content: 'I love footy ⚽️',
      group: groups[0]
    }, {
      user: users[2],
      content: 'Check out group 2',
      group: groups[1]
    }, {
      user: users[2],
      content: 'I love WDI-33',
      group: groups[1]
    }]);
  })
  .then(messages => console.log(`${messages.length} messages created`))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());
