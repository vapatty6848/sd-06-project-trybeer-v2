const express = require('express');
const cors = require('cors');
const server = require('http');
require('dotenv/config');

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

const routes = require('./src/main.routes');
const controllers = require('./src/controllers/chat');

const specs = swaggerJsDoc(swaggerOptions);

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());

app.use(express.json());

app.use(routes);

io.on('connection', (socket) => {
  controllers.chat(io, socket);
  controllers.user(io, socket);
});

module.exports = http;
