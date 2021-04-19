const SaleProduct = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('Sale_Product', {
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });
  saleProduct.associate = (models) => {
    saleProduct.belongsToMany(models.Sale, { 
      foreignKey: 'saleId',
      as: 'sale',
      through: saleProduct,
      otherKey: 'id',
    });
    saleProduct.belongsToMany(models.Product, { 
      foreignKey: 'productId',
      as: 'product',
      through: saleProduct,
      otherKey: 'id',
    });
  };
  return saleProduct;
};

module.exports = SaleProduct;
