module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('products',
      [{
        id: '1', name: 'Skol Lata 250ml', price: 2.20, urlImage: 'http://localhost:3001/images/Skol Lata 350ml.png',
      }, {
        id: '2', name: 'Heineken 600ml', price: 7.50, urlImage: 'http://localhost:3001/images/Heineken 600ml.png',
      }, {
        id: '3', name: 'Antarctica Pilsen 300ml', price: 2.49, urlImage: 'http://localhost:3001/images/Antarctica Pilsen 300ml.png',
      }, {
        id: '4', name: 'Brahma 600ml', price: 7.50, urlImage: 'http://localhost:3001/images/Brahma 600ml.png',
      }, {
        id: '5', name: 'Skol 269ml', price: 2.19, urlImage: 'http://localhost:3001/images/Skol 269ml.png',
      }, {
        id: '6', name: 'Skol Beats Senses 313ml', price: 4.49, urlImage: 'http://localhost:3001/images/Skol Beats Senses 313ml.png',
      }, {
        id: '7', name: 'Becks 330ml', price: 4.99, urlImage: 'http://localhost:3001/images/Becks 330ml.png',
      }, {
        id: '8', name: 'Brahma Duplo Malte 350ml', price: 2.79, urlImage: 'http://localhost:3001/images/Brahma Duplo Malte 350ml.png',
      }, {
        id: '9', name: 'Becks 600ml', price: 8.89, urlImage: 'http://localhost:3001/images/Becks 600ml.png',
      }, {
        id: '10', name: 'Skol Beats Senses 269ml', price: 3.57, urlImage: 'http://localhost:3001/images/Skol Beats Senses 269ml.png',
      }, {
        id: '11', name: 'Stella Artois 275ml', price: 3.49, urlImage: 'http://localhost:3001/images/Stella Artois 275ml.png',
      },
      ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
