const productModel = require('../models/Products');

const allProducts = () => productModel.allProducts();

module.exports = { allProducts };
