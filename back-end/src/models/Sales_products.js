const Sale_productModel = (sequelize, DataTypes) => {
  const Sale_product = sequelize.define('Sales_products', {
    quantity: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Sale_product.associate = (models) => {

    Sale_product.belongsToMany(models.Product, {
      through: 'Products',
      as: 'products',
      foreignKey: 'sale_id',
    });

    Sale_product.belongsToMany(models.Sale, {
      through: 'Sales',
      as: 'sales',
      foreignKey: 'product_id',
    });

  }

  return Sale_product;
};

module.exports = Sale_productModel;