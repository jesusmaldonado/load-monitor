import Server from 'socket.io';
export function LoadServer(){
  this.io = new Server().attach(8090);
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
