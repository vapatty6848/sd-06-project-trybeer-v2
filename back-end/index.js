const express = require('express');
const cors = require('cors');
const path = require('path');
const moment = require('moment');
const httpServer = require('http');
const io = require('socket.io');
const LoginController = require('./src/controller/LoginControler');
const UsersController = require('./src/controller/UsersController');
const ProductsController = require('./src/controller/ProductsController');
const ProfileController = require('./src/controller/ProfileController');
const SalesController = require('./src/controller/salesController');
const CheckoutController = require('./src/controller/CheckoutController');
const ClientOrdersController = require('./src/controller/ClientOrdersController');

const PORT = 3001;

const app = express();
const server = httpServer.createServer(app);

app.use(express.json());
app.use(cors());

io(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('connectRoom', (roomName) => {
    socket.join(roomName);
  });

  socket.on('teste', (msg) => {
    console.log(`Server recebe mensagem: ${msg}`);
  });

  socket.on('chat.sendMessage', (data) => {
    const sentAt = moment().format('HH:mm');
    const chatData = { ...data, sentAt };
    console.log(chatData);
    io.to(chatData.from).emit('chat.receiveMessage', chatData);
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
