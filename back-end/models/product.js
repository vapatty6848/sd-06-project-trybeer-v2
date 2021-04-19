const Product = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    urlImage: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return product;
};

module.exports = Product;