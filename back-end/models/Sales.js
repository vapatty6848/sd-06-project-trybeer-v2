const createSales = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'users' });
  };

  return Sales;
};

module.exports = createSales;
