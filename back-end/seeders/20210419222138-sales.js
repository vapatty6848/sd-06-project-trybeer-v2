module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        userId: 1,
        totalPrice: 25,
        deliveryAddress: 'slkdlasjdlkajsdas',
        deliveryNumber: 25,
        status: 'pendente',
        saleDate: new Date('2011-08-01T19:58:00.000Z'),
      },
      {
        userId: 1,
        totalPrice: 50,
        deliveryAddress: 'pwqwpeopqwoeopqwpeq',
        deliveryNumber: 50,
        status: 'pendente',
        saleDate: new Date('2011-08-01T19:58:00.000Z'),
      },
      {
        userId: 1,
        totalPrice: 100,
        deliveryAddress: 'mnmbmvbnmbvnxbxc',
        deliveryNumber: 100,
        status: 'pendente',
        saleDate: new Date('2011-08-01T19:58:00.000Z'),
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sale_products', null, {});
  },
};
