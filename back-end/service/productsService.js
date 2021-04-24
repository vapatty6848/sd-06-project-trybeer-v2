// const productsModel = require('../model/productsModel');
const { products } = require('../models');

const getAllProducts = async () => products.findAll();

module.exports = {
  getAllProducts,
};
