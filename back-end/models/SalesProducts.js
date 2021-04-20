const createSalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('sales_products', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.STRING,
  }, { timestamps: false });
  SalesProducts.associate = (models) => {
    models.Sales.belongsToMany(models.Products,
      { as: 'products', through: SalesProducts, foreignKey: 'productId', otherKey: 'saleId' });
    models.Products.belongsToMany(models.Sales,
      { as: 'sales', through: SalesProducts, foreignKey: 'saleId', otherKey: 'productId' });
  };
  return SalesProducts;
};

module.exports = createSalesProducts;
