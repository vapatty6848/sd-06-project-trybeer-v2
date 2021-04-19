module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        userId: 1,
        totalPrice: 4.40,
        deliveryAddress: 'Rua dos Bobos',
        deliveryNumber: 0,
        saleDate: '2021-03-30 09:51:14',
        status: 'Pendente'
      },
      {
        userId: 1,
        totalPrice: 8.80,
        deliveryAddress: 'Rua Tenente Garro',
        deliveryNumber: 202,
        saleDate: '2021-03-30 09:51:14',
        status: 'Pendente'
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
