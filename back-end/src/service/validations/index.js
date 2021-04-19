const addressValidation = require('./addressValidation');
const adminValidation = require('./adminValidation');
const loginValidation = require('./loginValidation');
const newUserValidation = require('./newUserValidation');
const saleValidation = require('./saleValidation');
const tokenValidation = require('./tokenValidation');
const productsValidation = require('./productsValidation');

module.exports = {
  adminValidation,
  addressValidation,
  loginValidation,
  newUserValidation,
  saleValidation,
  tokenValidation,
  productsValidation,
};
