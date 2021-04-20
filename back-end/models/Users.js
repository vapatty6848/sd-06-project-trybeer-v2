const Users = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, { timestamps: false });

  user.associate = (models) => {
    user.hasMany(models.sales, { as: 'sales', foreignKey: 'userId' });
  };

  return user;
};

module.exports = Users;