const { Router } = require('express');

const routerSalesDetails = require('./SalesDetailsController');
const validateToken = require('../middlewares/validateToken');
// const { createOne, getAllByUserId } = require('../models/SalesService');
const { sales } = require('../models');

const routerSales = Router();

routerSales.post('/', validateToken, async (req, res) => {
  const { products,
    price: totalPrice,
    address: deliveryAddress,
    number: deliveryNumber,
    status } = req.body.order;
  const { userId } = res.locals;
    console.log(userId, totalPrice, deliveryAddress, deliveryNumber, status);
  const sale = await sales.create({
    userId, totalPrice, deliveryAdress, deliveryNumber, status,
  });
  console.log('Venda', sale);
  console.log('Venda Simplificada', sale.dataValues);
  // res.status(201).json({ order: {
  //   saleId: insertId, userId, price, address, number, status, date,
  // } });
});

routerSales.get('/', validateToken, async (req, res) => {
  const { userId } = res.locals;
  // const [orders] = await getAllByUserId(userId);
  const orders = await sales.findByPk(userId);
  res.status(200).json({ orders });
});

routerSales.use('/', routerSalesDetails);

module.exports = routerSales;

// {price: 2.2, address: "asd", number: "12", status: "Pendente"}
