const { Router } = require('express');

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
    // salesProduct = saleId productId quantity
    // preciso pegar o quantidade que está em salesProduct
    // preciso pegar o nome do produto que está em products
    // preciso pegar o subtotal que é quantity (productSales) * price (products) 
    const vendas = await salesProducts.findAll({ where: { saleId: id } });
    vendas.forEach(async (e) => {
      const { quantity, productId, saleId } = e.dataValues;
      const { dataValues: { name, price } } = await products.findByPk(productId);
      // console.log(`Venda de id ${saleId} : ${quantity} un - (id produto ${productId}) - ${name}  valor ${price}`);
      // array.push({ saleId, productId, quantity, name, price });
    });

    const sale = await sales.findByPk(id);
    return res.status(200).json(sale);
  } catch (err) {
    next({ status: 404, message: err.message });
    // next({ status: 404, message: 'not Found' });
  }
});

module.exports = routerSalesDetails;
