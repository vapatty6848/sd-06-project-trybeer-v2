const connection = require('./connection');

const allOrders = async () => {
  const [orders] = await connection.execute(
    'SELECT * FROM sales',
  );
  return orders;
};

const changeStatus = async (id) => {
  await connection.execute('UPDATE sales SET status = "Entregue" WHERE id = ?', [id]);
};

module.exports = {
  allOrders,
  changeStatus,
};
