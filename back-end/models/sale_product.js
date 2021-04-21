const SaleProduct = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('saleProduct', {
    quantity: DataTypes.INTEGER,
  }, { timestamps: false });
  saleProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, { 
      foreignKey: 'productId',
      as: 'sales',
      through: saleProduct,
      otherKey: 'saleId',
    });
    models.sale.belongsToMany(models.product, { 
      foreignKey: 'saleId',
      as: 'products',
      through: saleProduct,
      otherKey: 'productId',
    });
  };
  return saleProduct;
};

module.exports = SaleProduct;
