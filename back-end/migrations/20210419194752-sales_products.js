module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesProducts', {
      saleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'sales', key: 'id' },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'products', key: 'id' },
      },
      quantity: { allowNull: false, type: Sequelize.STRING },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('salesProducts');
  },
};