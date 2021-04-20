const { Router } = require('express');

const routerSalesDetails = require('./SalesDetailsController');
const validateToken = require('../middlewares/validateToken');
// const { createOne, getAllByUserId } = require('../models/SalesService');
const { sales, salesProducts } = require('../models');

const routerSales = Router();

routerSales.post('/', validateToken, async (req, res) => {
  const { products,
    price: totalPrice, address: deliveryAddress, number: deliveryNumber, status, 
  } = req.body.order;
  const { userId } = res.locals;

  const { id, saleDate } = await sales.create({
    userId, totalPrice, deliveryAddress, deliveryNumber, status,
  });
  products.map(async (e) => {
    await salesProducts.create({ saleId: id, productId: e.prod_id, quantity: e.qty });
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
