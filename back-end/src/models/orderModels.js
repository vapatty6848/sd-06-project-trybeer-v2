const connection = require('../database/connection');

const create = async ({ userID, value, street, number, date }) => {
  const [ordes] = await connection.execute(
      `INSERT INTO sales
        (user_id, total_price, delivery_address, delivery_number, sale_date, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [userID, value, street, number, date, 'Pendente'],
    );
    return ordes;
  };

const getSales = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM Trybeer.sales',
  );
  return sales;
};

const getBySales = async (id) => {
  const [sales] = await connection.execute(
    'SELECT * FROM Trybeer.sales WHERE id = (?)', [id],
  );
  return sales;
};

const createSaleProduct = async (saleId, productId, quantity) => {
  await connection
    .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?,?,?)',
    [saleId, productId, quantity]);
};

const getOrderByID = async (id) => {
  const [sales] = await connection.execute(
    `SELECT * FROM sales_products 
    INNER JOIN products ON sales_products.product_id = products.id 
    INNER JOIN sales ON sales_products.sale_id = sales.id WHERE sale_id = ?`, [id],
  );
  return sales;
};

const updateStatusOrder = async (id) => {
  const result = await connection.execute(
    'UPDATE Trybeer.sales SET status = \'Entregue\' WHERE id = ?', [id],
  );
  return result;
};

module.exports = {
  create,
  getSales,
  getBySales,
  createSaleProduct,
  getOrderByID,
  updateStatusOrder,
};
