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

const PORT = process.env.PORT || 3001;

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());

app.use(bodyParser.json());

app.use(routes);

io.on('connection', (socket) => {
  controllers.chat(io, socket);
  controllers.user(io, socket);
});

http.listen(PORT, () => console.log(`On na port ${PORT}`));
