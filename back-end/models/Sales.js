const Sales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DECIMAL(4, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  { timestamps: false });

  sales.associate = (models) => {
    sales.belongsTo(models.users, { as: 'user', foreignKey: 'userId' });
  };

  return sales;
};

module.exports = Sales;