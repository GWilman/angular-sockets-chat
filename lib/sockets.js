const socketIo = require('socket.io');

// let connection = null;

const groups = {};

function connect(server) {

  const io = socketIo(server);

  // const nsp = io.of('/socket');

  io.on('connection', socket => {
    console.log(`Socket ID: ${socket.id} connected`);

    socket.on('set user', data => {
      groups[data.groupId] = groups[data.groupId] || {};
      groups[data.groupId].users = groups[data.groupId].users || {};
      groups[data.groupId].users[socket.id] = data.userId;
      console.log('Groups:', groups);
      io.emit('update users', groups[data.groupId].users);
    });

    socket.on('remove user', data => {
      groups[data.groupId].users = data.users;
    });

    socket.on('message sent', data => {
      console.log('MESSAGE SENT:', data);
      io.emit('message sent', data);
    });

    socket.on('disconnect', () => {
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
