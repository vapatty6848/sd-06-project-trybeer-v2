const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute('SELECT * FROM Trybeer.sales');

  return sales;
};

const createSale = async (sale) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber } = sale;
  const newSale = await connection
    .execute(`INSERT INTO Trybeer.sales (user_id, total_price, 
      delivery_address, delivery_number, sale_date, status) VALUES (?, ?, ?, ?, NOW(), ?)`,
      [userId, totalPrice, deliveryAddress, deliveryNumber, 'Pendente']);
  return newSale;
};

const createSaleProduct = async (product) => {
  const { saleId, productId, quantity } = product;
  const newProduct = await connection
    .execute('INSERT INTO Trybeer.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity]);
  return newProduct;
};

const getOrder = async (id) => {
  const [order] = await connection.execute(`
  SELECT s.status AS Status,
  sp.sale_id AS idVenda,
  p.name AS product,
  p.price AS price,
  s.total_price AS total,
  s.sale_date AS saleDate,
  sp.quantity AS quantidade
  FROM Trybeer.sales AS s
  JOIN Trybeer.sales_products AS sp
  JOIN Trybeer.products AS p
  ON p.id = sp.product_id
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ?`, [id]);

  return order;
};

const updateOrder = async (id) => {
  const update = await connection
    .execute('UPDATE Trybeer.sales SET status = ? WHERE id = ?', ['Entregue', id]);
    return update;
};

module.exports = {
  getAllSales,
  createSale,
  createSaleProduct,
  getOrder,
  updateOrder,
};
