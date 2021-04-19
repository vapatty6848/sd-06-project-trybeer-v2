module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      },
      totalPrice: { type: Sequelize.FLOAT },
      deliveryAddress: { type: Sequelize.STRING },
      deliveryNumber: { type: Sequelize.INTEGER },
      saleDate: { type: Sequelize.DATE },
      status: { type: Sequelize.STRING },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};