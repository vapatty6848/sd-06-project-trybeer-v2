const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('Sale_Product', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  });

  return SalesProducts;
};

module.exports = SalesProductsModel;
