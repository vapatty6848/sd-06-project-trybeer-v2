const createProducts = (sequelize, DataTypes) => {
  const product = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  }, { timestamps: false });

  product.associate = (models) => {
    product.belongsToMany(models.sales_products,
      { foreignKey: 'productId', as: 'product' });
      return product;
  };

  return product;
};

module.exports = createProducts;
