const { sales } = require('./sales');
const { products } = require('./products');

module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });
  salesProducts.removeAttribute('id');

  salesProducts.associate = (models) => {
    models.salesProducts.belongsToMany(models.sales, {
      as: 'sales', through: 'sales', foreignKey: 'saleId', otherKey: 'id',
    });

    models.salesProducts.belongsToMany(models.products, {
      as: 'product', through: 'products', foreignKey: 'productId', otherKey: 'id',
    });
  };
  return salesProducts;
};
