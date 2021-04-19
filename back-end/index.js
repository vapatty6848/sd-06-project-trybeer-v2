// import { bodyParser } from 'body-parser';
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); 
require('dotenv').config();

const error = require('./src/middlewares/error.js');
const loginRouter = require('./src/controllers/loginController.js');
const registerRouter = require('./src/controllers/registerController');
const productsRouter = require('./src/controllers/productsController.js');
const profileRouter = require('./src/controllers/profileController');
const orderController = require('./src/controllers/orderController');

const app = express();
const PORT = process.env.PORT || 3001;

// Para entregar arquivos estáticos como imagens, arquivos CSS, e arquivos JavaScript
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(morgan('dev'));

app.use(express.json());

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/products', productsRouter);

app.use('/profile', profileRouter);

app.use('/orders', orderController);

app.use('/images', express.static(`${__dirname}/images`));

app.all('*', (_req, res) => {
  res
    .status(404)
    .json({ message: 'EndPoint não existe' });
});

app.use(error);

app.listen(PORT, () => console.log(`Servidor rodando na porta:  ${PORT}`));
