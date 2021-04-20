const connection = require('./connection');

const allProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

module.exports = {
  allProducts,
};
