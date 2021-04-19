const connection = require('./connection');

const columns = 'user_id, total_price, delivery_address, delivery_number, sale_date, status';
const createOrder = async ({
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  status,
}) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales (${columns}) VALUES (?, ?, ?, ?, now(), ?)`,
    [userId, totalPrice, deliveryAddress, deliveryNumber, status],
  );
  return ({
    id: insertId, totalPrice, deliveryAddress, deliveryNumber, status,
  });
};

const createOrderProduct = async ({ item, saleId }) => {
  const { id, quantity } = item;

  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, id, quantity],
  );
};

const getAll = async () => {
  const [orders] = await connection.execute(
    'SELECT *, CONVERT_TZ(sale_date, "+00:00", "-03:00") as `date_time` FROM sales',
  );
  return orders;
};

const getAllByUser = async (id) => {
  const [orders] = await connection.execute(
    'SELECT *, CONVERT_TZ (sale_date, "+00:00", "-03:00")as `date_time` FROM sales WHERE user_id=?',
    [id],
  );
  return orders;
};

const alter = async ({ id, status }) => {
  await connection.execute(
    'UPDATE sales SET status = ? WHERE id = ?', [status, id],
  );
};

const getById = async (id) => {
  const [order] = await connection.execute(`SELECT
    products.name, products.price, sales_products.quantity
    FROM sales_products INNER JOIN products
    ON products.id = sales_products.product_id
    WHERE sales_products.sale_id = ?`,
    [id]);
  return order;
};

const getByIdAdmin = async (id) => {
  const [order] = await connection.execute(`SELECT
    products.name, products.price, sales_products.quantity,
    sales_products.sale_id, sales.status, sales.total_price
    FROM sales_products INNER JOIN products
    ON products.id = sales_products.product_id
    INNER JOIN sales ON sales.id = sales_products.sale_id
    WHERE sales_products.sale_id = ?`,
    [id]);
  return order;
};

module.exports = {
  createOrder,
  getAll,
  getAllByUser,
  alter,
  createOrderProduct,
  getById,
  getByIdAdmin,
};