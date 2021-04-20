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
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        referencer: { model: 'Users', key: 'id' },
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Pendente',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
