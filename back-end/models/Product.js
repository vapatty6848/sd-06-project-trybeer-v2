const Product = (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      // eslint-disable-next-line camelcase
      urlImage: DataTypes.STRING,
    },
    { timestamps: false },
  );
  
  products.associate = (models) => {
    // products.hasMany(models.salesProducts, { foreignKey: 'productId', as: 'salesProducts' });
    products.belongsToMany(models.sales, {
      through: 'salesProducts',
      as: 'ola2',
      foreignKey: 'productId',
    });
  };

  return products;
};
  
module.exports = Product;