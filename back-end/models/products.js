const createProducts = (sequelize, Datatypes) => {
  const Product = sequelize.define('products', {
    name: Datatypes.STRING, 
    price: Datatypes.NUMBER,
    urlImage: Datatypes.STRING,
  });
  return Product;
};

module.exports = createProducts;
