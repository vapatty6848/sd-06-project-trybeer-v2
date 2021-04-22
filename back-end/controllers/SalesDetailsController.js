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

routerSalesDetails.post('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body.sale;
  console.log(status);
  try {
    // await sales.update(
    //   { status: newStatus },
    //   { where: { id } },
    //   ); 
    // console.log(user);
    // 0 = nao encontrou ou nao alterou 1=alterado com sucesso
    // const { dataValues } = await sales.findOne({ where: { email } });
    // console.log(dataValues);
    // const { name } = dataValues;
    // return res.status(200).json({ name, email });
    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
});

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
         [sequelize.col('sale.status'), 'status'],
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
