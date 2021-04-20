const salesModel = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.STRING,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  sales.associate = (model) => {
    sales.belongsTo(model.users, { foreignKey: 'id', as: 'user' });
  };

  return sales;
};

module.exports = salesModel;
