module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('salesProduct', {
      saleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        defaultValue: 1,
        references: {
          model: 'sales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        defaultValue: 1,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('salesProduct'),
};