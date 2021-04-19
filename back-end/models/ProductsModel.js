const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getPriceById = async (id) => {
  const [[product]] = await connection.execute('SELECT price, name FROM products WHERE id=?',
  [id]);
  return product;
};

module.exports = {
  getAll,
  getPriceById,
};
