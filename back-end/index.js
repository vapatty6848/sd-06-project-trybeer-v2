const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const changeNameController = require('./controllers/changeNameController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const adminOrderController = require('./controllers/adminOrderController');
const orderDetailsController = require('./controllers/orderDetailsController');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', userController, changeNameController, cartController);

app.use('/', productController, adminOrderController, orderDetailsController);
app.use('/images', express.static(`${__dirname}/images`));

const PORT = 3001;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
