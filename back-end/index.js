const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const cors = require('cors');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const UserService = require('./Services/userService');
const ProductsService = require('./Services/productService');
const Utils = require('./Utils');
const SalesService = require('./Services/salesService');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(`${__dirname}/images`));

app.post('/login', rescue(UserService.loginUser));

app.post('/register', 
  rescue(UserService.validateEmail), 
  rescue(UserService.registerNewUser));

app.put('/profile/edit', 
  rescue(Utils.verifyToken), 
  rescue(UserService.updateUser));

app.get('/products', ProductsService.findAllProducts);

app.post('/orders', 
  rescue(Utils.verifyToken), 
  rescue(SalesService.registerNewOrder));

app.get('/orders/:useremail', rescue(SalesService.getOrdersByUser));

app.get('/orderdetails/:saleid', rescue(SalesService.getOrderDetails));

app.get('/admin/orders', rescue(SalesService.getAdminOrders));

app.get('/admin/orders/:id', rescue(SalesService.getAdminOrderDetails));

app.put('/admin/orders/:id', rescue(SalesService.editOrderStatus));

app.use((err, _req, res, _next) => {
  const codeStatus = (err.codeStatus) ? err.codeStatus : 500;
  res.status(codeStatus).json({ message: err.message });
});

app.listen(PORT);
