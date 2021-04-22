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
    models.products.belongsToMany(models.sales,
      { as: 'sales', foreignKey: 'productId', through: 'salesProducts', otherKey: 'saleId' });

    models.sales.belongsToMany(models.products,
      { as: 'products', foreignKey: 'saleId', through: 'salesProducts', otherKey: 'productId' });
  };
  return salesProducts;
};
