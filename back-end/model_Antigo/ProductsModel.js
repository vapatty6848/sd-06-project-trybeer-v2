const connection = require('../database/connection');

const listProducts = async () => connection.execute('SELECT * FROM products');

const productById = async (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

module.exports = {
    listProducts,
    productById,
  };
