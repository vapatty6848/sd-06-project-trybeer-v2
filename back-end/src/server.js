const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv/config');
// const path = require('path');

const { salesProducts, sales } = require('./database/models');

// const { 
//   UserRoute,
//   LoginRoute,
//   ProductsRoute,
//   SalesRoute,
//   OrderRoute,
// } = require('./routes');

// const { error } = require('./middleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.post('/login', async (req, res) => {
  const { body } = req;
  const user = await salesProducts.create(body);
 // const list = await salesProducts.find({ where: { saleId: id } });
  return res.status(201).json(user);
});
// app.use('/login', LoginRoute);
// app.use('/user', UserRoute);
// app.use('/products', ProductsRoute);
// app.use('/orders', OrderRoute);
// app.use('/sales', SalesRoute);
// app.use('/images', express.static(path.join(__dirname, '/images')));
// app.use(error);

module.exports = app;
