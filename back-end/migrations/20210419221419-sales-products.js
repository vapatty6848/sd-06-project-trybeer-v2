'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      // eslint-disable-next-line camelcase
      sale_id: { type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
        references: { model: 'sales', key: 'id' },
      },
      // eslint-disable-next-line camelcase
      product_id: { type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'products', key: 'id' },
      },
      quantity: { type: Sequelize.STRING, allowNull: false },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales_products');
  },
};
