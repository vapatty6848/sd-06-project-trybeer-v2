require('dotenv').config();
const cors = require('cors');
const express = require('express');

const port = 3001;
const socketPort = 3000;
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: `http://localhost:${socketPort}`, methods: ['GET', 'POST'] },
  });

const path = require('path');
const { json } = require('body-parser');
const { usersRouter } = require('./controllers/users');
const { productsRouter } = require('./controllers/products');
const ordersRouter = require('./controllers/orders');
const adminRouter = require('./controllers/admin');
const userChatController = require('./controllers/chatUser');

app.use(json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/admin', adminRouter);

io.on('connection', (socket) => {
  console.log('connection do back-end');

  socket.on('getMessages', ({ email }) => userChatController.getAllMessages({ email, io }));

  socket.on('message', ({ nickname, message, email }) => (
    userChatController.saveMessage({ nickname, message, email, io })
  ));

  socket.on('disconnect', () => console.log('user disconnected'));
});

app.get('/', (_req, res) => res.send('Hello World!'));

httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
