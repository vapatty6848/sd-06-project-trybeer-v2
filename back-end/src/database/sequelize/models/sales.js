const createSale = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(4, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    status: DataTypes.STRING,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { foreignKey: 'id', as: 'users' });
  };

  return Sales;
};

module.exports = createSale;
