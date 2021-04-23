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
} = require('./routes');
const { error } = require('./middleware');

const getHour = () => {
  const date = new Date();
  const hour = `${date.getHours()}:${date.getMinutes()}`;
  return hour;
};

io.on('connection', (socket) => {
console.log(socket.id);

  socket.on('login', (userName) => {
    io.emit('socketNick', userName);
  });

  socket.on('message', ((message) => {
    const bodyMessage = { message, hour: getHour() };
    io.emit('sendMessage', bodyMessage);
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
app.use(error);

module.exports = httpServer;
