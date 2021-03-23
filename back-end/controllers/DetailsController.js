const { Router } = require('express');
const rescue = require('express-rescue');
const { status200 } = require('../services');
const { OrdersService } = require('../services');
const validateToken = require('../auth/validateToken');

const Details = new Router();

Details.get('/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;
  console.log('id', req.params);
  const orderDetails = await OrdersService.getOrderDetailsByid(id);
  console.log('orderDetails', orderDetails);
  return res.status(status200).json(orderDetails);
}));

module.exports = Details;