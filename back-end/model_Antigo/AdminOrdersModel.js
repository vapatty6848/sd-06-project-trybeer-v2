const connection = require('../database/connection');

const listAllOrders = async () => connection
  .execute('SELECT * FROM sales');
const getAdminOrderById = async (id) => connection
  .execute(
    'SELECT quantity, name, price, status, '
    + 'FORMAT((quantity * price), 2) AS productPrice FROM sales AS s '
    + 'INNER JOIN sales_products AS sp ON s.id = sp.sale_id '
    + 'INNER JOIN products AS p ON sp.product_id = p.id WHERE s.id = ?',
    [id],
  );
const updateStatusOrder = async (id, status) => connection
  .execute(
    'UPDATE sales SET status = ? WHERE id = ?',
    [status, id],
  );

module.exports = { listAllOrders, getAdminOrderById, updateStatusOrder };