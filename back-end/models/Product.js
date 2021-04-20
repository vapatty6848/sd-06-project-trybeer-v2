const createProduct = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    urlImage: DataTypes.STRING,
  }, { timestamps: false });

  return Product;
};

module.exports = createProduct;
