'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales_products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sales_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Sales', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
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
    
    await queryInterface.dropTable('sales_products');
  }
};
