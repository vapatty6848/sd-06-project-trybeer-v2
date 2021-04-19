const salesModel = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.STRING,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
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
