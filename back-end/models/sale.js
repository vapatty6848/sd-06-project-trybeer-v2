const Sale = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.FLOAT,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    createdAt: 'saleDate',
  });
  sale.associate = (models) => {
    sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return sale;
};

module.exports = Sale;