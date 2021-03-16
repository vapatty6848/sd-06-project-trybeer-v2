const connection = require('./Connection');

const getAllProducts = async () => {
  const [product] = await connection.execute('SELECT * FROM products');
  return product;
};

module.exports = {
  getAllProducts,
};
