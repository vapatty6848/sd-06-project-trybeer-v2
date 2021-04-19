const { Sequelize } = require('sequelize');

const createSale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DECIMAL(4, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    saleDate: Sequelize.DATE,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.user,
      { foreignKey: 'userId', as: 'user' });
      Sale.hasOne(models.salesProducts,
        { foreignKey: 'saleId', as: 'sale' });
  };

  return Sale;
};

module.exports = createSale;
