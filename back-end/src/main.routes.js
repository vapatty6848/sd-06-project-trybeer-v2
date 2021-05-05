require('dotenv/config');
const express = require('express');
const path = require('path');
const { log, handleError } = require('./middlewares');

const {
  adminRouter,
  notFound,
  productsRouter,
  salesRouter,
  sessionRouter,
  usersRouter,
} = require('./routes');

const routes = express.Router();

routes.use('/login', sessionRouter);
routes.use('/products', productsRouter);
routes.use('/sales', salesRouter);
routes.use('/user', usersRouter);
routes.use('/admin', adminRouter);
routes.use('/images', express.static(path.join(__dirname, './images')));
routes.use('*', notFound);

routes.use(log);
routes.use(handleError);

module.exports = routes;
