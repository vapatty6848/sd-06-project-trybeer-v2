const Sale = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales',
    {
      // eslint-disable-next-line camelcase
      user_id: DataTypes.INTEGER,
      // eslint-disable-next-line camelcase
      total_price: DataTypes.FLOAT,
      // eslint-disable-next-line camelcase
      delivery_address: DataTypes.STRING,
      // eslint-disable-next-line camelcase
      delivery_number: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      createdAt: 'sale_date',
      updatedAt: false,
    });
  
  sales.associate = (models) => {
    sales.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' });
    sales.hasMany(models.sales_products, { foreignKey: 'sale_id', as: 'sales_products' });
  };

  return sales;
};
  
module.exports = Sale;
