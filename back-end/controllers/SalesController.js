const { Router } = require('express');

const routerSalesDetails = require('./SalesDetailsController');
const validateToken = require('../middlewares/validateToken');
// const { createOne, getAllByUserId } = require('../models/SalesService');
const { sales } = require('../models');

const routerSales = Router();

routerSales.post('/', validateToken, async (req, res) => {
  const { 
    price: totalPrice, address: deliveryAddress, number: deliveryNumber, status, 
  } = req.body.order;
  const { userId } = res.locals;

  const { id, saleDate } = await sales.create({
    userId, totalPrice, deliveryAddress, deliveryNumber, status,
  });
  res.status(201).json({ order: {
    saleId: id, userId, totalPrice, deliveryAddress, deliveryNumber, status, saleDate,
  } });
});

routerSales.get('/', validateToken, async (req, res) => {
  const { userId } = res.locals;
  const orders = await sales.findByPk(userId);
  res.status(200).json({ orders });
});

routerSales.use('/', routerSalesDetails);

module.exports = routerSales;
