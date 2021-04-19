const userModel = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  user.associate = (model) => {
    user.hasOne(model.sales, { foreignKey: 'id', as: 'user' });
  };

  return user;
};

module.exports = userModel;
