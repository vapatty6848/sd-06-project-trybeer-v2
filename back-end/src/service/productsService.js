const productsModel = require('../model/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

module.exports = {
  getAll,
};
