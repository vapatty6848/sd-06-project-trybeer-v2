const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('Sales_Products', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  });

  return SalesProducts;
};

module.exports = SalesProductsModel;
