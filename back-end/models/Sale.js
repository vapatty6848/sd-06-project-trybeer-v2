module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sale', {
    totalPrice: DataTypes.DOUBLE,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    status: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.user,
      { foreignKey: 'userId', as: 'user' });
  };

  return Sales;
};
