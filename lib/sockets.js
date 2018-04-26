const socketIo = require('socket.io');

// let connection = null;

let chat = {};

//
// CURRENT STATUS - MANAGING USER MEMBERSHIP FINE FOR ONE GROUP
// NEED TO ALTER FOR SIMULTANEOUS GROUPS
//

function connect(server) {

  const io = socketIo(server);

  // const nsp = io.of('/socket');

  io.on('connection', socket => {
    console.log(`Socket ID: ${socket.id} connected`);

    socket.on('set user', data => {
      chat[socket.id] = data.userId;
      // groups[data.groupId] = groups[data.groupId] || {};
      // groups[data.groupId].users = groups[data.groupId].users || {};
      // groups[data.groupId].users[socket.id] = data.userId;
      console.log('CHAT user added:', chat);
      io.emit('update users', chat);
    });

    socket.on('remove user', users => {
      chat = users;
      console.log('CHAT user removed:', chat);
    });

    socket.on('typing', user => {
      console.log('TYPER', user);
      io.emit('typer', user);
    });

    socket.on('message sent', () => {
      console.log('MESSAGE SENT');
      io.emit('message sent');
    });

    socket.on('disconnect', () => {
      if (Object.keys(chat).length === 1) {
        chat = {};
        console.log('CHAT cleared:', chat);
      }
      io.emit('user disconnected', socket.id);
    });
  });


  // connection = nsp;
  // return connection;
}

// function getConnection() {
//   return connection;
// }

module.exports = { connect };
