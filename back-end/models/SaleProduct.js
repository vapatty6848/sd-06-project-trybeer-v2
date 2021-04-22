module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    quantity: DataTypes.INTEGER,
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false
  });

  SalesProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return SalesProduct;
};
