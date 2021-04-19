module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id', onUpdate: 'CASCADE', onDelete: 'CASCADE' } },
      totalPrice: { allowNull: false, type: Sequelize.DECIMAL(9, 2) },
      deliveryAddress: { allowNull: false, type: Sequelize.STRING },
      deliveryNumber: { allowNull: false, type: Sequelize.STRING },
      saleDate: { allowNull: false, type: Sequelize.DATE },
      status: { allowNull: false, type: Sequelize.STRING },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
