module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasOne(models.sale,
      { foreignKey: 'userId', as: 'sale' });
  };

  return Users;
};
