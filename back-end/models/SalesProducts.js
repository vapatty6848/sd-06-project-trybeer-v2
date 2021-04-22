const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('sales_products', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  });

  return SalesProducts;
};

module.exports = SalesProductsModel;
