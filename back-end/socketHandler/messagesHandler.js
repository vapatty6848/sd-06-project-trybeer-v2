module.export = (io, socket) => {
  const createMessage = () => {
    console.log('teste');
  };
  socket.on('chat:sendMessage', createMessage);
};
