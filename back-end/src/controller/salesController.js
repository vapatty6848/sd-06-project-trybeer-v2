const { Router } = require('express');
const salesService = require('../service/salesService');

const controller = Router();

// GET SALE BY SALE ID --------------------------------------------------------
controller.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;

  const result = await salesService.getSaleById({ id, token });

  if (result.payload) return next(result);
  return res.status(200).json(result);
});

// GET ALL SALES ---------------------------------------
controller.get('/', async (req, res, next) => {
  const { authorization: token } = req.headers;

  const result = await salesService.getAll(token);
  
  if (result.payload) return next(result);
  return res.status(200).json(result);
});

// CREATE SALE ----------------------------------------------------------------
controller.post('/', async (req, res, next) => {
  const { total, address, number, customerId, products } = req.body;
  const { authorization: token } = req.headers;

  const result = await salesService.createSale({
    total, address, number, customerId, products, token,
  });
  
  if (result.payload) return next(result);
  return res.status(200).json({ message: 'Sale created.' });
});

controller.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;

  const result = await salesService.updateSale({ id, token });
  console.log(result[0]);
  if (result.payload) return next(result);
  return res.status(200).json({ message: 'Sale updated.' });
});

module.exports = controller;
