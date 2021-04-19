const productModel = require('../models/productModel');

const allProducts = () => productModel.allProducts();

module.exports = { allProducts };
