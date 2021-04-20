const createSaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.INTEGER,
  }, { timestamps: false });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(
      models.Product,
      { foreignKey: 'productId', as: 'product' },
    );
  };

  return SaleProduct;
};

module.exports = createSaleProduct;