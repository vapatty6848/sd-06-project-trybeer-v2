const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connect', (socket) => {
  console.log(`Novo usuário conectado: ${socket.id}`);
  });

httpServer.listen(3001, () => console.log('Lister in port 3001'));