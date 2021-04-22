const Sale_productModel = (sequelize, DataTypes) => {
  const Sale_product = sequelize.define('SalesProduct', {
    quantity: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Sale_product.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: Sale_product,
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      through: Sale_product,
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

    Sale_product.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sale',
    });
    Sale_product.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return Sale_product;
};

module.exports = Sale_productModel;