const createProducts = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return Products;
};

module.exports = createProducts;
