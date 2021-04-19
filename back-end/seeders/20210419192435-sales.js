module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        userId: 2,
        totalPrice: 50.00,
        deliveryAddress: 'Rua Engenheiro Alberto Pontes',
        deliveryNumber: 31,
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
