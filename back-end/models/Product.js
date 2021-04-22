const createProduct = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    urlImage: DataTypes.STRING,
  }, { timestamps: false });

  Product.associate = (models) => {
    Product.hasMany(models.saleProduct);
  };

  return Product;
};

module.exports = createProduct;
