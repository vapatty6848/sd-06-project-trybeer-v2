const createProducts = (sequelize, DataTypes) => {
  const appUser = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    url_image: DataTypes.STRING,
  }, { timestamps: false });

  return appUser;
};

module.exports = createProducts;
