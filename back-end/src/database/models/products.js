module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  products.associate = (models) => {
    products.hasMany(models.salesProducts, {
      foreignKey: 'productId', as: 'saleProduct',
    });
  };

  return products;
};
