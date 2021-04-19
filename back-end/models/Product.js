const Product = (sequelize, DataTypes) => {
    const products = sequelize.define(
      'products',
      {
        name: DataTypes.STRING,
        price: DataTypes.STRING,
        url_image: DataTypes.STRING,
      },
      { timestamps: false },
    );
  
  return products;
};
  
  module.exports = Product;