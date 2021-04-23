const UserModel = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: { msg: 'Email Taken.' },
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  { timestamps: false });

  Users.associate = (models) => {
    Users.hasMany(models.sales,
      { foreignKey: 'userId' });
  };

  return Users;
};

module.exports = UserModel;