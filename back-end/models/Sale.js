const Sale = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales',
    {
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    { createdAt: 'sale_date', updatedAt: false });
  
  sales.associate = (models) => {
    sales.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' });
    sales.belongsToMany(models.products, {
      through: 'sales_products',
      as: 'ola',
      foreignKey: 'sale_id',
    });
  };

  return sales;
};
  
module.exports = Sale;
