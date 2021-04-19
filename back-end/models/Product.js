module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    urlImage: DataTypes.STRING,
  },
  {
    timestamps: false
  });

  return Products;
};
