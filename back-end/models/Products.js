const Products = (sequelize, Datatypes) => {
  const Products = sequelize.define('Product', {
    name: Datatypes.STRING,
    price: Datatypes.DECIMAL(10, 2),
    urlImage: Datatypes.STRING,
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

module.exports = Products;
