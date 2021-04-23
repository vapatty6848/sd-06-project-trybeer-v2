const createSaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('saleProduct', {
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    quantity: DataTypes.INTEGER,
  }, { timestamps: false });

  SaleProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      as: 'sales', through: SaleProduct, foreignKey: 'productId', otherKey: 'saleId',
    });

    models.sale.belongsToMany(models.product, {
      as: 'product', through: SaleProduct, foreignKey: 'saleId', otherKey: 'productId',
    });
  };

  return SaleProduct;
};

module.exports = createSaleProduct;