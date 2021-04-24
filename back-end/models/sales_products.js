const createProductsSales = (sequelize, DataTypes) => {
  const order = sequelize.define('salesProducts', {
    saleId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    quantity: DataTypes.DECIMAL,
  }, { timestamps: false });

  order.associate = (models) => { 
    models.products.belongsToMany(models.sales, {
      as: 'sales', foreignKey: 'productId', otherKey: 'saleId', through: order,
    });
    models.sales.belongsToMany(models.products, {
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: order,
    });
  };

  /* order.associate = (models) => {
    order.belongsToMany(models.products, {
        as: 'products', through: 'products', foreignKey: 'productId', otherKey: 'id',
    });
  };
  */
  return order;
};

module.exports = createProductsSales;
