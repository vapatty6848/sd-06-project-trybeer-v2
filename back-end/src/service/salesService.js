// const salesModel = require('../model');
const Validations = require('./validations');

// GET ALL --------------------------------------------------------------------
const getAll = async (token) => {
  const validateToken = await Validations.tokenValidation(token);
  
  if (validateToken.payload) return validateToken;
  const { role, id } = validateToken;
  
  const result = role === 'administrator'
    ? await salesModel.getAll()
    : await salesModel.getSalesByUserId(id);
  
  return result;
};

// GET SALE BY SALE ID --------------------------------------------------------
const getSaleById = async ({ id, token }) => {
  const validateToken = await Validations.tokenValidation(token);

  if (validateToken.payload) return validateToken;

  const result = await salesModel.getSaleById(id);

  return result;
};

// CREATE SALE ----------------------------------------------------------------
const createSale = async ({ total, address, number,
  customerId, products, token }) => {
  const validateToken = await Validations.tokenValidation(token);
  const validateSale = await Validations.saleValidation({ customerId, total });
  const validateAddress = Validations.addressValidation({ address, number });
  const validateProducts = Validations.productsValidation(products);

  if (validateToken.payload) return validateToken;
  if (validateSale.payload) return validateSale;
  if (validateAddress.payload) return validateAddress;
  if (validateProducts.payload) return validateProducts;

  const result = await salesModel.createSale({ total, address, number, customerId });
  const { id } = result;

  await salesModel.createSalesProducts({ id, products });

  return result;
};

const updateSale = async ({ id, token }) => {
  const validateToken = await Validations.tokenValidation(token);

  if (validateToken.payload) return validateToken;

  const result = await salesModel.updateSale({ id });
  
  return result;
};

module.exports = {
  createSale,
  getAll,
  getSaleById,
  updateSale,
};
