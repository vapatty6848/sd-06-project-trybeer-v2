const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { LoginController,
  RegisterController,
  ProfileController,
  ProductController,
} = require('./controllers');
const { error } = require('./services');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

app.use('/login', LoginController);
app.use('/register', RegisterController);
app.use('/profile', ProfileController);
app.use('/products', ProductController);
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use(error);
app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));
