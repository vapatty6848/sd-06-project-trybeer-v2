const Sale = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.FLOAT,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    timestamps: true,
    createdAt: 'saleDate',
    updatedAt: false,
  });
  sale.associate = (models) => {
    sale.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
  };
  return sale;
};

module.exports = Sale;