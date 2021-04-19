const { Router } = require('express');
const productsService = require('../service/productsService');

const controller = Router();

controller.get('/', async (_req, res) => {
  const result = await productsService.getAll();

  return res.status(200).json(result);
});

module.exports = controller;