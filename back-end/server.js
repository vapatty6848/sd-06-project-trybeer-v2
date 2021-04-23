const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http');

const app = express();
const http = server.createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./src/openAPI/swaggerOptions');
require('dotenv/config');

const routes = require('./src/main.routes');
const controllers = require('./src/controllers/chat');

const specs = swaggerJsDoc(swaggerOptions);

const APP_PORT = process.env.APP_PORT || 3001;
const SOCKET_PORT = process.env.APP_PORT || 4001;

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());

app.use(bodyParser.json());

app.use(routes);

io.on('connection', (socket) => {
  console.log('backend -> usuário logou');
  const { token } = socket.handshake.auth;
  if (token.role === 'client') {
    token.roomKey = `${token.email}-room`;
    socket.join(token.roomKey);
  }
  socket.on('admin:joinRoom', (client) => {
    token.roomKey = `${client}-room`;
    socket.join(token.roomKey);
  });
  controllers.chat(io, socket, token);
  controllers.user(io, socket, token);
  controllers.admin(io, socket, token);
});

app.listen(APP_PORT, () => console.log(`App lissssssning na port ${APP_PORT}`));
http.listen(SOCKET_PORT, () => console.log(`Socket lisssning na port ${SOCKET_PORT}`));
