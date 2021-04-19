const connection = require('../database/connection');

const getProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM Trybeer.products',
  );
  return products;
};

module.exports = {
  getProducts,
};