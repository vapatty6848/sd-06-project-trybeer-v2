// 'use strict';

module.exports = {
  // eslint-disable-next-line max-lines-per-function
  up: async (queryInterface, Sequelize) => {
    const salesTable = await queryInterface.createTable('sales', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      },
      totalPrice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return salesTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('sales'),
};
