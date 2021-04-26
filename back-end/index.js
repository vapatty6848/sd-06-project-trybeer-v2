const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const SOCKET_PORT = 3002;

const cors = require('cors');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const UserService = require('./Services/userService');
const ProductsService = require('./Services/productService');
const chatService = require('./Services/chatService');
const Utils = require('./Utils');
const SalesService = require('./Services/salesService');

app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(`${__dirname}/images`));

app.post('/login', rescue(UserService.loginUser));

app.post('/register', 
  rescue(UserService.validateEmail), 
  rescue(UserService.registerNewUser));

app.put('/profile/edit', 
  rescue(Utils.verifyToken), 
  rescue(UserService.updateUser));

app.get('/products', ProductsService.findAllProducts);

app.post('/orders', 
  rescue(Utils.verifyToken), 
  rescue(SalesService.registerNewOrder));

app.get('/orders/:useremail', rescue(SalesService.getOrdersByUser));

app.get('/orderdetails/:saleid', rescue(SalesService.getOrderDetails));

app.get('/admin/orders', rescue(SalesService.getAdminOrders));

app.get('/admin/orders/:id', rescue(SalesService.getAdminOrderDetails));

app.put('/admin/orders/:id', rescue(SalesService.editOrderStatus));

app.post('/chat', rescue(chatService.saveMessage));

app.get('/chat', rescue(chatService.getMessages));

app.use((err, _req, res, _next) => {
  const codeStatus = (err.codeStatus) ? err.codeStatus : 500;
  res.status(codeStatus).json({ message: err.message });
});

io.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
httpServer.listen(SOCKET_PORT, () => console.log(`Socket running on port ${SOCKET_PORT}`));
