const express = require('express');
require('dotenv').config({ path: '../.env' });
const cors = require('cors');

const log = require('./middlewares/log');
const { NOT_FOUND } = require('./schema/statusSchema');
const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');
const ProductsController = require('./controller/ProductsController');
const SalesController = require('./controller/SalesController');

const app = express();
const http = require('http').createServer(app);
const PORT = parseInt(process.env.PORT, 10) || 3001;
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const chat = require('./chat/Chat');
app.use(express.json());
app.use('/images', express.static(`${__dirname}/images`));
app.use(cors());
app.use(log);

const timestamp = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`
};

io.on('connection', (socket) => {
  console.log('Usuario Conectado')
  socket.on('message', async (data) => {
    console.log(data);
    await chat.postMessages(data.message, data.user, timestamp());
    io.emit('message', `${data.user} - ${timestamp()}: ${data.message}`)
  });
});

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/products', ProductsController);
app.use('/sales', SalesController);
app.get('/chat', async (req, res) => {
  const messages = await chat.getAll();
  res.json(messages);
});

app.all('*', (_req, res) => res.status(NOT_FOUND).json({ message: 'Route not found' }));

http.listen(PORT);
//app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
