const { Router } = require('express');
const rescue = require('express-rescue');
const productsService = require('../service/productsService');
// const ordersController = require('./ordersController');

const router = Router();

router.get('/products', rescue(async (_req, res) => {
  const allProducts = await productsService.getAllProducts();

  return res.status(200).json(allProducts);
}));

module.exports = router;
