const createSale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.FLOAT,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, { timestamps: false });

  Sale.associate = (models) => {
    Sale.belongsTo(
      models.User,
      { foreignKey: 'userId', as: 'user' },
    );
    Sale.hasMany(models.SaleProduct);
  };

  return Sale;
};

module.exports = createSale;