const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3001;
app.use(express.json());
app.use(cors());

const userController = require('./controller/userController');
const productsController = require('./controller/productsController');
const ordersController = require('./controller/ordersController');
const messageController = require('./controller/messageController');
const unexpectedError = require('./middlewares/unexpectedError');
const { messagesHandler } = require('./socketHandler');

const onConnection = (socket) => {
  messagesHandler(io, socket);
};

io.on('connection', onConnection);

app.use('/images', express.static(`${__dirname}/images`));

app.get('/', (req, res) => res.send('ok'));

app.use('/', userController);

app.use('/profile', userController);

app.use('/', productsController);

app.use('/', ordersController);

app.use('/messages', messageController);

app.use(unexpectedError);

httpServer.listen(PORT, () => console.log(`Example app listening on ${PORT}!`));
