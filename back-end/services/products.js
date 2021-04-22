const { product } = require('../models');

const getAllProducts = async () => product.findAll();

module.exports = { getAllProducts };