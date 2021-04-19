const createProductsSales = (sequelize, DataTypes) => {
  const order = sequelize.define('sales_products', {
    saleId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    quantity: DataTypes.DECIMAL,
  }, { timestamps: false });

  order.associate = (models) => {
    order.belongsToMany(models.sales, {
      as: 'sales', through: 'sales', foreignKey: 'saleId', otherKey: 'id',
    });
    order.belongsToMany(models.products, {
      as: 'products', through: 'products', foreignKey: 'productId', otherKey: 'id',
  });
  };

/*   order.associate = (models) => {
    order.belongsToMany(models.products, {
        as: 'products', through: 'products', foreignKey: 'productId', otherKey: 'id',
    });
  };
 */
  return order;
};

module.exports = createProductsSales;
