const salesProduct = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define(
    'sales_products',
    {
      // eslint-disable-next-line camelcase
      sale_id: { type: DataTypes.INTEGER, primaryKey: true },
      // eslint-disable-next-line camelcase
      product_id: { type: DataTypes.INTEGER, primaryKey: true },
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(models.products, { foreignKey: 'product_id', as: 'products' });
    salesProducts.belongsTo(models.sales, { foreignKey: 'sale_id', as: 'sales' });
  };

  return salesProducts;
};

module.exports = salesProduct;
