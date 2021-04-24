const express = require('express');
const cors = require('cors');
const path = require('path');
const moment = require('moment');
const http = require('http');
const socket = require('socket.io');
const LoginController = require('./src/controller/LoginControler');
const UsersController = require('./src/controller/UsersController');
const ProductsController = require('./src/controller/ProductsController');
const ProfileController = require('./src/controller/ProfileController');
const SalesController = require('./src/controller/salesController');
const CheckoutController = require('./src/controller/CheckoutController');
const ClientOrdersController = require('./src/controller/ClientOrdersController');

const PORT = 3001;

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

const io = socket(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socketIo) => {
  console.log('Usuário conectado');

  socketIo.on('connectRoom', (roomName) => {
    socketIo.join(roomName);
  });

  socketIo.on('teste', (msg) => {
    console.log(`Server recebe mensagem: ${msg}`);
  });

  socketIo.on('chat.sendMessage', (data) => {
    const sentAt = moment().format('HH:mm');
    const dataIo = { ...data, sentAt };
    console.log(dataIo);
    io.to(dataIo.from).emit('chat.receiveMessage', dataIo);
  });
});

app.use('/login', LoginController);

app.use('/register', UsersController);
app.use('/products', ProductsController);
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/profile', ProfileController);
app.use('/admin/orders', SalesController);
app.use('/checkout', CheckoutController);
app.use('/orders', ClientOrdersController);

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json(err.message);
});

httpServer.listen(PORT, console.log(`Experando Requisições na porta ${PORT}`));
