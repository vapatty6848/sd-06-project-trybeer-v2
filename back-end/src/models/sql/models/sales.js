const SalesModel = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    totalPrice: DataTypes.DECIMAL(10, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    status: DataTypes.STRING,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { foreignKey: 'userId' });

    Sales.belongsToMany(models.products, {
      through: models.Sales_Products,
      as: 'products',
      foreignKey: 'saleId',
    });
  };

  return Sales;
};

module.exports = SalesModel;
