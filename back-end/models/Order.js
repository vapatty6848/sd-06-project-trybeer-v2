const connection = require('./Connection');

// __________ IMPORTANT __________
// https://stackoverflow.com/questions/12694051/dapper-connection-query-or-connection-execute
// If you need to return a value, then use Query().
// If you need to execute a query that does not return anything,
// an update for example, then use Execute().

const registerOrder = async (order) => {
  const { id, totalValue, street, number, date, status } = order;
  return connection.query(
  `INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)
  VALUES (?, ?, ?, ?, ?, ?)`, [id, totalValue, street, number, date, status],
).then((result) => result[0]); 
};

const registerEachProduct = async (saleId, products) => {
  await products.forEach((product) => connection.query(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
  [saleId, product.id, product.qtd],
  ).then((result) => result));
};

const getOrders = async (userEmail) => {
  const [orders] = await connection.query(
    `SELECT sales.id AS "saleId", DATE_FORMAT(sales.sale_date,"%d/%m") AS "date",
    sales.status, sales.total_price AS "totalValue", sales.user_id AS userId
    FROM Trybeer.sales as sales
    JOIN Trybeer.users AS users ON users.id = sales.user_id
    WHERE users.email = ?;`, [userEmail],
    );
return orders;
};

// -- produtos por id de pedidos
// SELECT product.name AS "Product Name",
// infoSales.quantity AS quantity,
// product.price AS "Total Value"
// FROM Trybeer.sales_products AS infoSales
// JOIN Trybeer.products AS product ON product.id = infoSales.product_id
// WHERE infoSales.sale_id = 4;

// -- get para o admin
// SELECT id, total_price, delivery_address, delivery_number, status
// FROM Trybeer.sales;

// -- update no status
// UPDATE Trybeer.sales SET status = "Entregue" WHERE id = 4;

module.exports = {
  registerOrder,
  getOrders,
  registerEachProduct,
};