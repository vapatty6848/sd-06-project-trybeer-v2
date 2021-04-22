const Sale = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales',
    {
      userId: DataTypes.INTEGER,
      totalPrice: DataTypes.FLOAT,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    { createdAt: 'saleDate', updatedAt: false });
  
  sales.associate = (models) => {
    sales.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
    sales.belongsToMany(models.products, {
      through: 'salesProducts',
      as: 'ola',
      foreignKey: 'saleId',
    });
  };

  return sales;
};
  
module.exports = Sale;
