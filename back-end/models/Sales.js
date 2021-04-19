const Sales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    deliveryAddress: DataTypes.STRING,
    deliverNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, { timestamps: false });

  sales.associate = (models) => {
    sales.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return sales;
};

module.exports = Sales;
