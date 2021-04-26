const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv/config');
const path = require('path');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,  
  },
});

const { 
  UserRoute,
  LoginRoute,
  ProductsRoute,
  SalesRoute,
  OrderRoute,
  MessagesRoute,
} = require('./routes');
// const { error } = require('./middleware');
const { chatUtils } = require('./utils');

io.on('connection', (socket) => {
console.log('Usuario Entrou');

 socket.on('connectRoom', (room) => {
    socket.join(room);
    console.log(room);
  });

  socket.on('login', (userName) => {
    io.emit('socketNick', userName);
  });

  socket.on('message', ((data) => {
    const bodyMessage = { message: data.message, hour: chatUtils.getTime() };
    const { from, dest } = data;
    const key = [from, dest].sort().join('-');
    console.log(key);
    io.to(key).emit('sendMessage', bodyMessage);
    }));
});

app.use(cors());
app.use(bodyParser.json());

app.use('/login', LoginRoute);
app.use('/user', UserRoute);
app.use('/products', ProductsRoute);
app.use('/orders', OrderRoute);
app.use('/sales', SalesRoute);
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/messages', MessagesRoute);

// app.use(error);

module.exports = httpServer;
