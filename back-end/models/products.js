const createProducts = (sequelize, Datatypes) => {
  const Product = sequelize.define('products', {
    name: Datatypes.STRING, 
    price: Datatypes.NUMBER,
    url_image: Datatypes.STRING,
  });
  return Product;
};

module.exports = createProducts;
