module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('salesProducts', 
    [
      {
        saleId: 1,
        productId: 1,
        quantity: 10,
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 5,
      },
      {
        saleId: 1,
        productId: 3,
        quantity: 15,
      },
      {
        saleId: 2,
        productId: 1,
        quantity: 50,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('salesProducts', null, {});
  },
};
