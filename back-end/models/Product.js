const Product = (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      // eslint-disable-next-line camelcase
      url_image: DataTypes.STRING,
    },
    { timestamps: false },
  );
  
  products.associate = (models) => {
    // products.hasMany(models.sales_products, { foreignKey: 'product_id', as: 'sales_products' });
    products.belongsToMany(models.sales, {
      through: 'sales_products',
      as: 'ola2',
      foreignKey: 'product_id',
    });
  };

  return products;
};
  
module.exports = Product;