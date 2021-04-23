const createSale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.STRING,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, { timestamps: false });

  Sale.associate = (models) => {
    Sale.belongsTo(
      models.user,
      { foreignKey: 'userId', as: 'user' },
    );
    Sale.hasMany(models.saleProduct);
  };

  return Sale;
};

module.exports = createSale;