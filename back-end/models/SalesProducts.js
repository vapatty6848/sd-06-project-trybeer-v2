const createSalesProducts = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.STRING,
  }, { timestamps: false });
  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products,
      { as: 'products', through: salesProducts, foreignKey: 'productId', otherKey: 'saleId' });
    models.products.belongsToMany(models.sales,
      { as: 'sales', through: salesProducts, foreignKey: 'saleId', otherKey: 'productId' });
  };
  return salesProducts;
};

module.exports = createSalesProducts;
