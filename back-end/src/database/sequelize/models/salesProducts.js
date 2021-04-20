const createSalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    quantity: DataTypes.INTEGER,
  });

  SalesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales,
      { as: 'sales', foreignKey: 'productId', through: 'salesProducts', otherKey: 'saleId' });

    models.sales.belongsToMany(models.products,
      { as: 'products', foreignKey: 'saleId', through: 'salesProducts', otherKey: 'productId' });
  };

  return SalesProducts;
};

module.exports = createSalesProducts;
