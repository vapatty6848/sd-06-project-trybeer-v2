const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM Trybeer.products';
  const [products] = await connection.execute(query);

  const result = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    photo: product.url_image,
  }));

  return result;
};

module.exports = {
  getAll,
};
