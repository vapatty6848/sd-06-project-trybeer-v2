module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });
  salesProducts.removeAttribute('id');

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(models.sales, {
      foreignKey: 'saleId', as: 'sales',
    });

    salesProducts.belongsTo(models.products, {
      foreignKey: 'productId', as: 'product',
    });
  };
  return salesProducts;
};
