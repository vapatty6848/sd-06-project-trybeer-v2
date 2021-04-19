module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesProducts', {
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'sales', key: 'id', onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id', onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }, 
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('salesProducts');
  },
};
