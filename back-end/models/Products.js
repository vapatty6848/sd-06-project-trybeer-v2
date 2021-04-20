const Products = (sequelize, DataTypes) => {
  const product = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING,
  },
  { timestamps: false });

  return product;
};

module.exports = Products;