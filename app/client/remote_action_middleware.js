export default socket => store => next => action => {
  // there are no remote actions in this app but just in case
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
}
