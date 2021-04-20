const createUser = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  });

  Users.associate = (models) => {
    Users.hasMany(models.sales, { foreignKey: 'userId', as: 'users' });
  };

  return Users;
};

module.exports = createUser;
