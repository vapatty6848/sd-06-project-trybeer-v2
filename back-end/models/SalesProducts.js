const SalesProducts = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.STRING,
  },
  { timestamps: false });

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(models.sales, { as: 'sale', foreignKey: 'salesId' });
    salesProducts.belongsTo(models.products, { as: 'product', foreignKey: 'productsId' });
  };

  return salesProducts;
};

module.exports = SalesProducts;
