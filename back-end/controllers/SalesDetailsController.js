/* eslint-disable max-lines-per-function */
const { Router } = require('express');
const sequelize = require('sequelize');

const validateToken = require('../middlewares/validateToken');
// const SalesProductsModel = require('../models/SalesProducts');
// const ProductModel = require('../models/ProductsModel');
const { sales } = require('../models');
const { salesProducts } = require('../models');
const { products } = require('../models');

const routerSalesDetails = Router();

routerSalesDetails.use(validateToken);

routerSalesDetails.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const vendas = await salesProducts.findAll({
       where: { saleId: id }, 
       include: [
         { model: sales, as: 'sale', attributes: [] },
         { model: products, as: 'product', attributes: [] },
        ],
       attributes: [
         'quantity', 'saleId',
         [sequelize.col('sale.saleDate'), 'saleDate'],
         [sequelize.col('product.price'), 'price'],
         [sequelize.literal('product.price * quantity'), 'totalPrice'],
         [sequelize.col('product.name'), 'name'],
       ],
      });
    return res.status(200).json(vendas);
  } catch (err) {
    next({ status: 404, message: err.message });
    // next({ status: 404, message: 'not Found' });
  }
});

module.exports = routerSalesDetails;
