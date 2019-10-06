const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const socketio = require('socket.io');
const http = require('http');

function configureAPI() {
  const app = express();
  const server = http.Server(app);
  const io = socketio(server, {
    origins: '*:*',
  });

  // Storing the connected Users in an object is not the
  // best solution. Refer to Redis instead.
  const connectedUsers = {};

  io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    console.log(
      `socket connection: ${socket.id} by ${user_id}`
    );

    connectedUsers[user_id] = socket.id;
  });

  app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
  });
  app.use(cors());
  app.use(express.json());
  app.use('/files', express.static(path.resolve(
    __dirname, "..", "uploads"
  )));
  app.use(routes);

  return server;
}

module.exports = {
  init(port) {
    const server = configureAPI();

    server.listen(port, () => {
      console.log(`API listening on port ${port}.`);
    });
  },
}
