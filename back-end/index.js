const express = require('express');
const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE',
};

const app = express();
const port = 3001;

const bodyParser = require('body-parser');

const usersRouter = require('./controller/usersController');
const productsRouter = require('./controller/productsController');
const salesRouter = require('./controller/salesController');
const chatRouter = require('./controller/chatController');

app.use(express.static(`${__dirname}/images`));

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/chat', chatRouter);

app.listen(port, () => console.log(`Listening to port ${port}`));
