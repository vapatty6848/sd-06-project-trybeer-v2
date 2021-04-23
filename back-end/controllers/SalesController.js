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

routerSales.get('/', validateToken, async (req, res, next) => {
  try {
    const { userId } = res.locals;
    // const orders = await sales.findByPk(userId);
    const orders = await sales.findAll({ where: { userId } });
    // const orders = await sales.getUser();
    // const orders = await sales.getUsers();
    // const orders = await sales.getUserId();
    // const orders = await sales.getUsersId();
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
});

routerSales.use('/', routerSalesDetails);

module.exports = routerSales;
