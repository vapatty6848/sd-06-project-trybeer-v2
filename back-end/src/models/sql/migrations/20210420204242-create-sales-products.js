'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales_Products', {
      saleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: 'sales',
          key: 'id',
          unique: 'unique-product-per-sale',
        },
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: 'products',
          key: 'id',
          unique: 'unique-product-per-sale',
        },
        onDelete: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sales_Products');
  }
};