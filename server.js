import io from 'socket.io';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import sticky from 'sticky-session';
import cors from 'cors';
const EXPRESS_PORT = process.env.PORT || 8080;

export function LoadServer(){
  const app = express();
  app.use(cors());
  const server = require('http').Server(app);
  server.listen(EXPRESS_PORT);
  this.io = io(server, { origins: '*:*'});
  global.io = this.io;
  app.use(express.static('dist'))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  this.queuedMessages = [];
  this.socket = null
  this.io.on('connection', (socket) => {
    this.socket = socket;
    this.queuedMessages.forEach((message) => {
      this.emit(message);
    })
    this.queuedMessages = []
  });
}

LoadServer.prototype.emit = function(message){
  if (this.socket) {
    this.socket.emit('state', message);
  } else {
    this.queuedMessages.push(message);
  }
}
