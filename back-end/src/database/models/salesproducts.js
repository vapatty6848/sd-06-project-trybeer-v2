const createSalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: { type: DataTypes.INTEGER },
  });

  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.sale,
      { foreignKey: 'saleId', as: 'sale' });
    SalesProducts.belongsTo(models.product,
      { foreignKey: 'productId', as: 'product' });
  };

  return SalesProducts;
};

module.exports = createSalesProducts;
