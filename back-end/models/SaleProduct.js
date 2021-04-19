module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('Sale', {
    quantity: DataTypes.INTEGER,
    productId: { type: DataTypes.INTEGER, foreignKey: true },
    saleId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false
  });

  SaleProduct.associate = (models) => {
    models.Products.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
    models.Users.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return SaleProduct;
};
