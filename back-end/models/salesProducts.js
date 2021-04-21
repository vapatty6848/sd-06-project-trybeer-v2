const salesProductsModel = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('sales_products', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.STRING,
  }, { timestamps: false });

  salesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProducts,
      foreignKey: 'productId',
      otherKey: 'sale_id',
    });
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return salesProducts;
};

module.exports = salesProductsModel;
