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

const bodyParser = require('body-parser');

const usersRouter = require('./controller/usersController');
const productsRouter = require('./controller/productsController');
const salesRouter = require('./controller/salesController');
const chatRouter = require('./controller/chatController');
const { addMessage } = require('./model/chat');

app.use(express.static(`${__dirname}/images`));

app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/chat', chatRouter);

io.on('connect', (socket) => {
  console.log(`Novo usuário conectado: ${socket.id}`);
  socket.on('connectRoom', (room) => {
    socket.join(room);
  });

  socket.on('sendMessage', async (message) => {
    const { room } = message;
    console.log(message);
    io.to(room).emit('receivedMessage', message);
    await addMessage(message);
  });
  });

httpServer.listen(3001, () => console.log('Lister in port 3001'));