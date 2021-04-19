module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  { timestamps: false });

  sales.associate = (models) => {
    sales.hasMany(models.salesProducts, {
      foreignKey: 'saleId', as: 'saleProduct',
    });

    sales.belongsTo(models.users, {
      foreignKey: 'id', as: 'user',
    });
  };

  return sales;
};