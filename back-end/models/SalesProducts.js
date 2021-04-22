const SalesProducts = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    quantity: DataTypes.STRING,
  }, { timestamps: false });
  salesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  salesProducts.belongsTo(models.sales, {
    foreignKey: 'saleId',
    as: 'sale',
  });
  salesProducts.belongsTo(models.products, {
    foreignKey: 'productId',
    as: 'product',
  });
  };
  return salesProducts;
};

module.exports = SalesProducts;
