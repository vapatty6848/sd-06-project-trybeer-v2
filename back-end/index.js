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
const userController = require('./controllers/userController');
const changeNameController = require('./controllers/changeNameController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const adminOrderController = require('./controllers/adminOrderController');
const orderDetailsController = require('./controllers/orderDetailsController');
const chatController = require('./controllers/chatController');
const model = require('./modelsMongo/model');

app.use(bodyParser.json());
app.use(cors());

app.use('/', userController, changeNameController, cartController);

app.use('/', productController, adminOrderController, orderDetailsController, chatController);
app.use('/images', express.static(`${__dirname}/images`));

const getCurrentHour = () => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
};

const sendMessage = async (email, message, time) => {
    await model.createMessage(email, message, time);
};

io.on('connection', (socket) => {
  socket.on('chat.sendMessage', ({ email, newMessage }) => {
    const time = getCurrentHour();
    console.log(time);
    const message = newMessage;
    sendMessage(email, message, time);
    io.emit('chat.sentMessage', { email, message, time });
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
