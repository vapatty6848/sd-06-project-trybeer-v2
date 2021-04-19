const express = require('express');
require('dotenv').config();
const cors = require('cors');

const log = require('./middlewares/log');
const { NOT_FOUND } = require('./schema/statusSchema');
const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');
const ProductsController = require('./controller/ProductsController');
const SalesController = require('./controller/SalesController');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3001;

app.use(express.json());
app.use('/images', express.static(`${__dirname}/images`));
app.use(cors());
app.use(log);

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/products', ProductsController);
app.use('/sales', SalesController);

app.all('*', (_req, res) => res.status(NOT_FOUND).json({ message: 'Route not found' }));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
