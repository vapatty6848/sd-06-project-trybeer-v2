require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const userRouter = require('./src/controllers/UserController');
const productsRouter = require('./src/controllers/ProductController');
const salesRouter = require('./src/controllers/SalesController');
const routerMessage = require('./chat/controllers/mongoController');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const { createMessages } = require('./chat/models/mongoModel');

const port = 3001;
const portSocket = 4001;

io.on('connection', (socket) => {
  socket.on('message', async ({ userBack, time, msg, Loja }) => {
    console.log(userBack, time, msg, Loja);
    if (userBack !== undefined) {
      await createMessages(userBack, time, msg, Loja);
    }
    io.emit('messages', { userBack, time, msg, Loja });
  });

  // socket.on('adminMsg', async () => {
  //   io.emit('Mensagem do admin pro cliente');
  // });

  // socket.on('clientMsg', async () => {
  //   io.emit('Mensagem do cliente pro admin');
  // });
});

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/chat', routerMessage);
app.use('/images', express.static(`${process.cwd()}/images`));

app.use(errorMiddleware);
httpServer.listen(portSocket, () => console.log(`Example app listening on port ${portSocket}!`));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
