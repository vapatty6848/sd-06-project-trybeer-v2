const createProducts = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  // Products.associate = (models) => {
  //   Products.hasOne(models.,
  //     { foreignKey: '', as: '' });
  // };

  return Products;
};

module.exports = createProducts;
