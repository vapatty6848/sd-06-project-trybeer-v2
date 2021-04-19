const { connection } = require('../Database/connection');

const findAllProducts = () => connection.query(
  'SELECT * FROM Trybeer.products',

).then((result) => result[0]);

module.exports = {
  findAllProducts,
};
