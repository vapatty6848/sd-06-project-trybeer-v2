const { connection } = require('../Database/connection');

const registerNewOrder = async (order) => {
  const { id, orderValue, address, number, date, status } = order;
  return connection.query(
  'INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)'
  + ' VALUES (?, ?, ?, ?, ?, ?)', [id, orderValue, address, number, date, status],
).then((result) => result[0]); 
};

const insertProductSale = async (saleId, products) => {
  await products.forEach((product) => connection.query(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, product.id, product.quantity],
  ).then((result) => result)); 
};

const getOrdersByUser = async (email) => connection.query(
  'SELECT S.id AS id, DATE_FORMAT(S.sale_date,"%d/%m/%Y") AS date, S.total_price AS valueTotal '
  + 'FROM Trybeer.sales as S JOIN Trybeer.users AS U ON U.id = S.user_id WHERE U.email = ?',
  [email],
).then((result) => result[0]);

const getOrderById = async (id) => connection.query(
  'SELECT S.id AS numOrder, DATE_FORMAT(S.sale_date,"%d/%m/%Y") AS date, S.status, '
  + 'S.total_price AS valueTotal FROM Trybeer.sales AS S '
  + 'JOIN Trybeer.sales_products AS SP ON S.id = SP.sale_id '
  + 'WHERE S.id = ? GROUP BY S.id;', [id],
).then((result) => result[0][0]);

const getOrderProductsByOrderId = async (id) => connection.query(
  'SELECT P.name AS "description", SP.quantity AS quantity, P.price AS valueTotal '
  + 'FROM Trybeer.sales_products AS SP JOIN Trybeer.products AS P ON P.id = SP.product_id '
  + 'WHERE SP.sale_id = ?;', [id],
).then((result) => result[0]);

const getAdminOrders = () => connection.query(
  'SELECT id, total_price AS totalValue, delivery_address AS address, '
  + 'delivery_number AS number, status FROM Trybeer.sales;',
).then((result) => result[0]);

const editOrderStatus = (id) => connection.query(
  'UPDATE Trybeer.sales SET status = "Entregue" WHERE id = ?',
  [id],
);

module.exports = {
  registerNewOrder,
  insertProductSale,
  getOrdersByUser,
  getOrderById,
  getOrderProductsByOrderId,
  getAdminOrders,
  editOrderStatus,
};
