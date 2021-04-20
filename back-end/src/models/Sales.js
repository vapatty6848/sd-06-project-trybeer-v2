const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    total_price: DataTypes.DECIMAL,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: { type: DataTypes.DATE, defaultValue: new Date() },
    delivery_number: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Blogpost.associate = (models) => {
    Blogpost.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Sale;
};

module.exports = SaleModel;
