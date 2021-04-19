module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(models.sales, {
      foreignKey: 'id', as: 'sale',
    });

    salesProducts.belongsTo(models.products, {
      foreignKey: 'id', as: 'product',
    });
  };
  
  return salesProducts;
};
