const model = require('./model');

// GET ALL --------------------------------------------------------------------
const getAll = async () => {  
  const products = await model.findAll();

  if (!products) return ({ status: 500, payload: 'Internal error.' });
  
  return ({ status: 200, payload: products });
};

module.exports = { getAll };
