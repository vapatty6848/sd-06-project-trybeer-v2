const salesProduct = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define(
    'salesProducts',
    {
      // eslint-disable-next-line camelcase
      saleId: { type: DataTypes.INTEGER, primaryKey: true },
      // eslint-disable-next-line camelcase
      productId: { type: DataTypes.INTEGER, primaryKey: true },
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(models.products, { foreignKey: 'productId', as: 'products' });
    salesProducts.belongsTo(models.sales, { foreignKey: 'saleId', as: 'sales' });
  };

  return salesProducts;
};

module.exports = salesProduct;
