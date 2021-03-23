const { Router } = require('express');
const rescue = require('express-rescue');
const { status200 } = require('../services');
const { OrdersService } = require('../services');
const validateToken = require('../auth/validateToken');

const Details = new Router();

Details.get('/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;
  const orderDetails = await OrdersService.getOrderDetailsByid(id);
  return res.status(status200).json(orderDetails);
}));

module.exports = Details;