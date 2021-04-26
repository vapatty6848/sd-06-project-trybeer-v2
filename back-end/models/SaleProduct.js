module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('salesProduct', {
    quantity: DataTypes.INTEGER,
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
  }, { timestamps: false });

  SalesProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      as: 'sales', through: SalesProduct, foreignKey: 'productId', otherKey: 'saleId',
    });
    models.sale.belongsToMany(models.product, {
      as: 'products', through: SalesProduct, foreignKey: 'saleId', otherKey: 'productId',
    });
  };

  return SalesProduct;
};
