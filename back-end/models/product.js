const Product = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    urlImage: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return product;
};

module.exports = Product;