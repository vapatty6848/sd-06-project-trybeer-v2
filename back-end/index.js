const express = require('express');

const port = process.env.PORT || 3001;
const app = express();
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const cors = require('cors');

const Messages = require('./mongodb/messagesModel');

const currentDate = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

io.on('connection', (socket) => {
  console.log(`${socket.id} conectado`);
  
  socket.on('chat.sendMessage', async (data) => {
    const dataWithDate = { ...data, sentTime: currentDate() };
    io.emit('chat.receiveMessage', dataWithDate);
    await Messages.create(dataWithDate);
  });
});

const { errorMiddleware } = require('./middlewares/errorMiddleware');

app.get('/', (_req, res) => res.status(200).send('Hello World!'));

const { routerLogin,
  routerRegister, routerProducts, routerProfile, routerSales, 
  routerSalesAdm } = require('./controllers');

app.use(cors());
app.use(express.json());

app.use(express.static(`${__dirname}/uploads`));

app.use('/login', routerLogin);
app.use('/products', routerProducts);
app.use('/profile', routerProfile);
app.use('/register', routerRegister);
app.use('/orders', routerSales);
app.use('/admin/orders', routerSalesAdm);
app.get('/chat', async (req, res) => {
  const allMessages = await Messages.getAll();
  res.status(200).json(allMessages);
});

app.use(errorMiddleware);

httpServer.listen(port, () => console.log(`Running on ${port}`));
