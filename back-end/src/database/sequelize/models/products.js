const createProduct = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING,
  });

  return Products;
};

module.exports = createProduct;
