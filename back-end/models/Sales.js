const SalesModel = (sequelize, Datatypes) => {
  const Sales = sequelize.define('Sale', {
    totalPrice: Datatypes.DECIMAL(10, 2),
    deliveryAddress: Datatypes.STRING,
    deliveryNumber: Datatypes.STRING,
    status: Datatypes.STRING,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { foreignKey: 'userId' });
    Sales.belongsToMany(models.products, {
      through: models.Sales_Products,
      as: 'products',
      foreignKey: 'saleId',
    });
  };

  return Sales;
};

module.exports = SalesModel;
