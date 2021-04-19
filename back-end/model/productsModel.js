const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM Trybeer.products',
  );
  return products;
};

module.exports = {
  getAllProducts,
};
