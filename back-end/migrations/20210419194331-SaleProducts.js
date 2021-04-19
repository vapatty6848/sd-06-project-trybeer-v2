module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('saleProducts', {
  saleId: {
    type: Sequelize.INTEGER,
    references: {
    model: 'sales',
    key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primaryKey: true,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
    model: 'products',
    key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primaryKey: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    },
  });
  },
  down: async (queryInterface, _Sequelize) => {
  await queryInterface.dropTable('saleProducts');
  },
}; 