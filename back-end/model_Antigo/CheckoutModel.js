const connection = require('../database/connection');

const priceById = async (id) => connection.execute('SELECT price FROM products WHERE id = ?', [id]);

const createSale = async (body) => {
  const { id, totalPrice, deliveryAddress, deliveryNumber,
     salesProducts, saleDate, saleStatus } = body;
  const [saleTable] = await connection.execute(
    `INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)
     VALUES(?, ?, ?, ?, ?, ?)`,
    [id, totalPrice, deliveryAddress, deliveryNumber, saleDate, saleStatus],
    );
    
    const newSalesProducts = [];
    salesProducts.forEach((element) => { 
      newSalesProducts.push([saleTable.insertId, ...element]);
    });
    newSalesProducts.forEach(async (element) => {
      await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', element,
      );
    });
};
module.exports = { createSale, priceById };