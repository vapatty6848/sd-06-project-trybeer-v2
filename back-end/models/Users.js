const createUsers = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    // id: { primaryKey: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  users.associate = (models) => {
    users.hasMany(models.sales,
      { foreignKey: 'userId', as: 'users' });
  };

  return users;
};

module.exports = createUsers;
