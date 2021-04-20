const createSales = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    // status??? recebe como default pendente.. já insere aqui?
  }, {
    timestamps: false,
  });

  // Sales.associate = (models) => {
  //   Sales.??????(models.userModel,
  //     { foreignKey: '????', as: 'id' });
  // };

  return Sales;
};

module.exports = createSales;
