const createProduct = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING,
  });

  Product.associate = (models) => {
    Product.hasOne(models.salesProducts,
      { foreignKey: 'productId', as: 'product' });
  };

  return Product;
};

module.exports = createProduct;
