const productsModel = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    url_image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return products;
};

module.exports = productsModel;
