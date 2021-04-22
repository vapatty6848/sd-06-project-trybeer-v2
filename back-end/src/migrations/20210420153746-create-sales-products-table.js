'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('salesProducts', {
      saleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Sales', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Products', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  
  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('SalesProducts');
  }
};
