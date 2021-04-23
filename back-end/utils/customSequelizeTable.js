const sequelize = require('sequelize');
const { sales } = require('../models');
const { salesProducts } = require('../models');
const { products } = require('../models');

async function customSequelizeTable(id) {
  const table = await salesProducts.findAll({
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
 return table;
}

module.exports = customSequelizeTable;