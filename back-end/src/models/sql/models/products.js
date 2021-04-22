const ProductModel = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    urlImage: DataTypes.STRING,
  },
  { timestamps: false });

  Products.associate = (models) => {
    Products.belongsToMany(models.sales, {
      through: models.Sales_Products,
      as: 'sales',
      foreignKey: 'productId' });
  };

  return Products;
};

module.exports = ProductModel;