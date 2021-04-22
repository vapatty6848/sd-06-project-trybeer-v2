const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: { type: DataTypes.DATE, defaultValue: new Date() },
    deliveryNumber: DataTypes.STRING,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Sale;
};

module.exports = SaleModel;
