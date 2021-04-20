const rescue = require('express-rescue');

const { ProductsService } = require('../service');

const listProducts = rescue(async (_req, res) => {
  const getAllProducts = await ProductsService.getAllProducts();

  return res
    .status(200)
    .json(getAllProducts);
});

module.exports = {
  listProducts,
};
