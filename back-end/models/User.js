module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false
  });

  Users.associate = (models) => {
    Users.hasOne(models.Sale,
      { foreignKey: 'userId', as: 'sale' });
  };

  return Users;
};
