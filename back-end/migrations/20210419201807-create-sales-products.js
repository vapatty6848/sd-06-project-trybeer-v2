module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      saleId: { allowNull: false, 
        type: Sequelize.INTEGER, 
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
        references: { model: 'sales', key: 'id' },
      },
      productId: { allowNull: false, 
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'products', key: 'id' },
      },
      quantity: { allowNull: false, type: Sequelize.INTEGER },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('salesProducts');
  },
};