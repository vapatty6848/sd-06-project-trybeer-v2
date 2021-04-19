const connection = require('./connection');

const saleDetails = async (id) => {
  const [productsOfSale] = await connection.execute(
    `SELECT
    a.sale_date,
    a.status,
    b.sale_id,
    b.product_id,
    b.quantity,
    c.name,
    c.price
    FROM sales_products AS b
    INNER JOIN sales AS a
    ON b.sale_id = a.id
    INNER JOIN products AS c
    ON b.product_id = c.id
    WHERE b.sale_id = ?`, [id],
  );
  return productsOfSale;
};

module.exports = {
  saleDetails,
};
