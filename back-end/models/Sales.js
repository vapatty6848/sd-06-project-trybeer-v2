const createSales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
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

  sales.associate = (models) => {
    sales.belongsTo(models.users,
      { foreignKey: 'userId', as: 'users' });
  };

  return sales;
};

module.exports = createSales;
