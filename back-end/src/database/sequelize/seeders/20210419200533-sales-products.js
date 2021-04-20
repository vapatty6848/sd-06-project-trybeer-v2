module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('salesProducts', [
      {
        saleId: 1,
        productId: 2,
        quantity: 6,
      },
      {
        saleId: 1,
        productId: 4,
        quantity: 3,
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('salesProducts', null, {});
  },
};
