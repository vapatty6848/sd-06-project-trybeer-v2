// eslint-disable-next-line max-lines-per-function
const createSales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    // id: { primaryKey: true, type: DataTypes.INTEGER },
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING, 
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  sales.associate = (models) => {
    sales.belongsTo(models.users,
      { foreignKey: 'userId', as: 'users' });
  };
  // sales.associate = (models) => {
  //   sales.hasMany(models.salesProducts,
  //     { foreignKey: 'saleId', as: 'sales' });
  // };

  return sales;
};

module.exports = createSales;
