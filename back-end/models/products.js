const createProducts = (sequelize, DataTypes) => {
  const appUser = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  }, { timestamps: false });

  return appUser;
};

module.exports = createProducts;
