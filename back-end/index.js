const express = require('express');
const cors = require('cors');

const app = express();
const httpServer = require('http').createServer(app);

const PORT = 3001;

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const RegisterController = require('./controllers/RegistersController');
const ProductsController = require('./controllers/ProductsController');
const LoginController = require('./controllers/LoginController');
const { isUserLoggedIn, isUserAdmin } = require('./middlewares/validations');
const handleError = require('./middlewares/handleError');
const OrdersController = require('./controllers/OrdersController');
const AdminController = require('./controllers/AdminController');
const ChatController = require('./controllers/ChatController');

io.on('connection', (socket) => {
  console.log('Novo usuário conectado', socket.id);

  socket.on('emit', (email) => {
    console.log('Email SOCKET emit', email);
  });
});

app.use(cors());
app.use(express.json());

app.use('/register', RegisterController);
app.use('/products', ProductsController);
app.use('/login', LoginController);
app.use('/orders', OrdersController);
app.use('/admin', isUserLoggedIn, isUserAdmin, AdminController);
app.use('/chat', ChatController);

app.use('/images', express.static(__dirname.concat('/images')));

app.use(handleError);

httpServer.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));