const createUser = (sequelize, DataTypes) => {
  const appUser = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, { 
    timestamps: false,
    scopes: { userWithoutPassword: { attributes: { exclude: ['password'] } } } });

  appUser.associate = (models) => {
    appUser.hasMany(models.sales,
      { foreignKey: 'userId', as: 'sales' });
    return appUser;
  };

  return appUser;
};

module.exports = createUser;
