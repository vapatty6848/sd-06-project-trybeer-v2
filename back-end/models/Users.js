const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    role: DataTypes.STRING,
  }, { timestamps: false });

  users.associate = (models) => {
    users.hasMany(models.Sales,
      { foreignKey: 'userId', as: 'user' });
  };

  return users;
};

module.exports = Users;
