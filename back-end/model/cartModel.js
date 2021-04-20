const connection = require('./connection');

const addSale = async (sale) => {
  const { userId, total, street, number, data, status } = sale;
  const response = await connection.execute(
    `INSERT INTO sales (user_id, total_price, delivery_address,
      delivery_number, sale_date, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, total, street, number, data, status],
  );
  return response[0].insertId;
};

const addSaleProduct = async (salesProducts) => {
  salesProducts.forEach((saleProduct) => {
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleProduct.saleId, saleProduct.productId, saleProduct.quantity],
    );
  });
};

const getAllSales = async () => {
  const [cartSales] = await connection.execute(
    'SELECT * FROM sales',
  );
  return cartSales;
};

module.exports = {
  addSale,
  addSaleProduct,
  getAllSales,
};
