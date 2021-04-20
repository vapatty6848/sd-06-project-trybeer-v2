const createProductsSales = (sequelize, DataTypes) => {
  const order = sequelize.define('sales_products', {
    saleId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    quantity: DataTypes.DECIMAL,
  }, { timestamps: false });

  order.associate = (models) => { 
    models.products.belongsToMany(models.sales, {
      as: 'sales', foreignKey: 'product_id', otherKey: 'sale_id', through: order,
    });
    models.sales.belongsToMany(models.products, {
      as: 'products',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
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
