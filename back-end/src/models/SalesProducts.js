const Sale_productModel = (sequelize, DataTypes) => {
  const Sale_product = sequelize.define('SalesProduct', {
    quantity: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Sale_product.associate = (models) => {

    models.Sale.belongsToMany(models.Product, {
      through: 'Products',
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      through: 'Sales',
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

  }

  return Sale_product;
};

module.exports = Sale_productModel;