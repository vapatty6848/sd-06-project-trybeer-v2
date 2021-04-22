module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      // eslint-disable-next-line camelcase
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      },
      // eslint-disable-next-line camelcase
      totalPrice: { type: Sequelize.FLOAT, allowNull: false },
      // eslint-disable-next-line camelcase
      deliveryAddress: { type: Sequelize.STRING, allowNull: false },
      // eslint-disable-next-line camelcase
      deliveryNumber: { type: Sequelize.STRING, allowNull: false },
      // eslint-disable-next-line camelcase
      saleDate: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
