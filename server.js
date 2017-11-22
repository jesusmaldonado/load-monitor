import io from 'socket.io';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import sticky from 'sticky-session';
const EXPRESS_PORT = process.env.PORT || 8080;

export function LoadServer(){
  const app = express();
  const server = require('http').Server(app);
  if (!sticky.listen(server, EXPRESS_PORT)) {
    server.once('listening', () => {
      console.log('this has started');
    });
  };
  this.io = io(server);
  app.use(express.static('dist'))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  this.queuedMessages = [];
  this.socket = null
  this.io.on('connection', (socket) => {
    this.socket = socket;
    this.queuedMessages.forEach((message) => {
      console.log('message', message);
      this.emit(message);
    })
    this.queuedMessages = []
  });
}

LoadServer.prototype.emit = function(message){
  if (this.socket) {
    console.log('')
    this.socket.emit('state', message);
  } else {
    this.queuedMessages.push(message);
  }
}
