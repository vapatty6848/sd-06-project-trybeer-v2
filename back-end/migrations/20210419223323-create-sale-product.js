module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('saleProducts', {
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { 
          model: 'products',
          key: 'id',
        },
      },
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
           model: 'sales',
            key: 'id',
        },
      },
      quantity: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('saleProducts');
  },
};