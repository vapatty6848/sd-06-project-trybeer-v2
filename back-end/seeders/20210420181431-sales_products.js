module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales_products', 
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
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};
