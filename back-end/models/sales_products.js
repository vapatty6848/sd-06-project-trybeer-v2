const createSalesProducts = (sequelize, Datatypes) => {
  const SaleProduct = sequelize.define('sales_products', {
    saleId: Datatypes.INTEGER,
    productId: Datatypes.INTEGER,
    quantity: Datatypes.INTEGER,
  });
  
  SaleProduct.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'sale',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.products.belongsToMany(models.sales, {
      as: 'product',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  return SaleProduct;
};

module.exports = createSalesProducts;
