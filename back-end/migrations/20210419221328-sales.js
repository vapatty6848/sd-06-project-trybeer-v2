module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      // eslint-disable-next-line camelcase
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      },
      // eslint-disable-next-line camelcase
      total_price: { type: Sequelize.FLOAT, allowNull: false },
      // eslint-disable-next-line camelcase
      delivery_address: { type: Sequelize.STRING, allowNull: false },
      // eslint-disable-next-line camelcase
      delivery_number: { type: Sequelize.STRING, allowNull: false },
      // eslint-disable-next-line camelcase
      sale_date: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
