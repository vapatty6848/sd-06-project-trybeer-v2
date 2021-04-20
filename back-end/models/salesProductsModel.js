const createSalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('sales_products', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.STRING,
  }, { timestamps: false });
  SalesProducts.associate = (models) => {
    models.salesModel.belongsToMany(models.productModel,
      { as: 'products', through: 'sales_products', foreignKey: 'productId', otherKey: 'saleId' });
    models.productModel.belongsToMany(models.salesModel,
      { as: 'sales', through: 'sales_products', foreignKey: 'saleId', otherKey: 'productId' });
  };
  return SalesProducts;
};

module.exports = createSalesProducts;
