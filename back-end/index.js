const express = require('express');
const cors = require('cors');
const path = require('path');
// const multer = require('multer');
const LoginController = require('./src/controllers/LoginController');
const RegisterController = require('./src/controllers/RegisterController');
const ProductsController = require('./src/controllers/ProductsController');
const ProfileController = require('./src/controllers/ProfileController');
const SalesController = require('./src/controllers/SalesController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

// const images = multer({ dest: 'images/' });

app.use(cors());

app.use(express.json());

app.use('/login', LoginController);

app.use('/register', RegisterController);

app.use('/products', ProductsController);

app.use('/profile', ProfileController);

app.use('/sales', SalesController);

app.listen(port, () => console.log(`Running at ${port}`));
