const connection = require('../database/connection');

const listOrdersByUser = async (userId) => connection
  .execute('SELECT * FROM sales WHERE user_id = ?', [userId]);
const getOrderById = async (id) => connection
  .execute(
    'SELECT sale_date as saleDate, quantity, name, '
    + 'FORMAT((quantity * price), 2) AS productPrice FROM sales AS s '
    + 'INNER JOIN sales_products AS sp ON s.id = sp.sale_id '
    + 'INNER JOIN products AS p ON sp.product_id = p.id WHERE s.id = ?',
    [id],
  );

module.exports = { listOrdersByUser, getOrderById };