const salesProductsModel = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('sales_products', { quantity: DataTypes.STRING },
  { timestamps: false });

  salesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
  };

  return salesProducts;
};

module.exports = salesProductsModel;
