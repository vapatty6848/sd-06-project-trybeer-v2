const connection = require('./Connection');

const registerOrder = async ({ userId, totalPrice, deliveryAddress,
  deliveryNumber, saleDate, status }) => connection.execute(
    `INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
  [userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status],
  );

const registerEachProduct = async (saleId, products) => {
  await products.forEach((product) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
  [saleId, product.id, product.quantity],
  ));
};

const getOrders = async (userId) => {
  const [[orders]] = await connection.execute('SELECT * FROM sales WHERE user_id = ?', [userId]);
  return orders;
};

module.exports = {
  registerOrder,
  getOrders,
  registerEachProduct,
};