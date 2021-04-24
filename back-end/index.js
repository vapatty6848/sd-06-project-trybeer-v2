const express = require('express');
const cors = require('cors');
const userController = require('./controller/userController');
const productsController = require('./controller/productsController');
const ordersController = require('./controller/ordersController');
const unexpectedError = require('./middlewares/unexpectedError');
require('dotenv').config();

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

app.use('/images', express.static(`${__dirname}/images`));

app.get('/', (req, res) => res.send('ok'));

app.use('/', userController);

app.use('/profile', userController);

app.use('/', productsController);

app.use('/', ordersController);

app.use(unexpectedError);

app.listen(PORT, () => console.log(`Example app listening on ${PORT}!`));
