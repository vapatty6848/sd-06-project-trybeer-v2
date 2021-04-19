const createSaleProducts = (sequelize, _DataTypes) => {
  const saleProducts = sequelize.define(
  'saleProducts', {}, { timestamps: false },
  );
  saleProducts.associate = (models) => {
  models.Sales.belongsToMany(models.Products, {
  as: 'products',
  through: saleProducts,
  foreignKey: 'productId',
  otherKey: 'saleId',
  });
  models.Products.belongsToMany(models.Sales, {
  as: 'sales',
  through: saleProducts,
  foreignKey: 'saleId',
  otherKey: 'productId',
  });
  };
  return saleProducts;
  };
  
  module.exports = createSaleProducts; 