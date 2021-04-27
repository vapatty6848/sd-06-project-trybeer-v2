require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// require('./database/connectionMongo');

const app = express();

const httpServer = require('http').createServer(app);

require('./Socket.io/connectionSocket')(httpServer);

const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');
const ProfileController = require('./controllers/ProfileController');
const VerifyAuthorization = require('./middlewares/VerifyAuthotization');
const ProductsController = require('./controllers/ProductsController');
const CheckoutController = require('./controllers/CheckoutController');
const OrdersController = require('./controllers/OrdersController');
const AdminOrdersController = require('./controllers/AdminOrdersController');
const ChatController = require('./controllers/ChatController');

const PORT = 3001;

app.use(cors());

// app.use((req, _res, next) => {
//   console.log({
//     data: new Date(),
//     method: req.method,
//     router: req.originalUrl,
//   });
//   next();
// });

app.use(bodyParser.json());

app.use(express.static(__dirname));

app.use('/login', LoginController);

app.use('/register', RegisterController);

app.use(VerifyAuthorization);

app.use('/chat', ChatController);

app.use('/profile', ProfileController);

app.use('/products', ProductsController);

app.use('/checkout', CheckoutController);

app.use('/orders', OrdersController);

app.use('/admin/orders', AdminOrdersController);

app.use((err, _req, res, _next) => {
  console.error({ err });
  res.status(500).json({ erro: 'erro interno' });
});

httpServer.listen(PORT, () => console.log('running port', PORT));
