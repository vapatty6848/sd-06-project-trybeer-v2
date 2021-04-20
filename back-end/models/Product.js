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
    products.hasMany(models.sales_products, { foreignKey: 'product_id', as: 'sales_products' });
  };

  return products;
};
  
module.exports = Product;