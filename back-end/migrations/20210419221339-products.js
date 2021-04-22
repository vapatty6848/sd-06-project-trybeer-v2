module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      price: { type: Sequelize.INTEGER, allowNull: false },
      // eslint-disable-next-line camelcase
      urlImage: { type: Sequelize.STRING, allowNull: false },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
