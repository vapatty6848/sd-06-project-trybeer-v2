const express = require('express');
const cors = require('cors');
const server = require('http');
require('dotenv/config');

const app = express();
const http = server.createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./src/openAPI/swaggerOptions');
const controllers = require('./src/controllers/chat');

const routes = require('./src/main.routes');

const specs = swaggerJsDoc(swaggerOptions);

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());

app.use(express.json());

app.use(routes);

io.on('connection', (socket) => {
  const { token } = socket.handshake.auth;
  if (token && token.role === 'client') {
    token.roomKey = `${token.email}-room`;
    socket.join(token.roomKey);
  }

  controllers.chat(io, socket, token);
  controllers.user(io, socket, token);
  controllers.admin(io, socket, token);
});

module.exports = { app, http, io };
