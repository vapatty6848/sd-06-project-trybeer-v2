const Sale_productModel = (sequelize, DataTypes) => {
  const Sale_product = sequelize.define('salesProduct', {
    quantity: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Sale_product.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: Sale_product,
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.product.belongsToMany(models.sale, {
      through: Sale_product,
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

    Sale_product.belongsTo(models.sale, {
      foreignKey: 'saleId',
      as: 'sale',
    });
    Sale_product.belongsTo(models.product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return Sale_product;
};

module.exports = Sale_productModel;