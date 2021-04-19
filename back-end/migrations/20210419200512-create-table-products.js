'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      price: {
        type: Sequelize.NUMBER,
        allowNull: false,
      }, 
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    }, { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
