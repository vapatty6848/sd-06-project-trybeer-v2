const connection = require('./connection');

function renameOutputs(sales) {
  const result = sales.map((sale) => ({
    id: sale.id,
    total: sale.total_price,
    address: sale.delivery_address,
    number: sale.delivery_number,
    createdAt: sale.sale_date,
    status: sale.status,
  }));

  return result;
}

function renameSaleOutputs(sale) {
  const result = {
    id: sale[0].sale_id,
    customerId: sale[0].user_id,
    createdAt: sale[0].sale_date,
    address: sale[0].delivery_address,
    number: sale[0].delivery_number,
    status: sale[0].status,
    total: sale[0].total_price,
    products: sale.map((product) => ({
      id: product.product_id,
      name: product.name,
      quantity: product.quantity,
      photo: product.url_image,
      price: product.price,
    })),
  };

  return result;
}

const getAll = async () => {
  const query = 'SELECT * FROM Trybeer.sales';
  const [sales] = await connection.execute(query);

  const result = renameOutputs(sales);
  return result;
};

const getSalesByUserId = async (id) => {
  const query = 'SELECT * FROM Trybeer.sales WHERE user_id=?';
  const [sales] = await connection.execute(query, [id]);

  const result = renameOutputs(sales);
  return result;
};

const getSaleById = async (id) => {
  const query = `SELECT user_id, sale_id, sale_date, delivery_address,
  delivery_number,status, total_price, product_id, name, quantity, price,
  url_image FROM sales_products INNER JOIN (SELECT * FROM sales WHERE id=?)
  AS userOrders ON sales_products.sale_id = userOrders.id INNER JOIN products
  ON products.id = sales_products.product_id`;

  const [sale] = await connection.execute(query, [id]);

  const result = renameSaleOutputs(sale);
  return result;
};

const createSale = async ({ total, address, number, customerId }) => {
  const status = 'pending';
  const query = `INSERT INTO sales (user_id, total_price, delivery_address,
    delivery_number, sale_date, status) VALUES (?,?,?,?,NOW(),?)`;

  const [{ insertId }] = await connection.execute(query, [customerId, total, address,
    number, status]);

  return ({ id: insertId });
};

const createSalesProducts = async ({ id, products }) => {
  const valuesPlaces = products.reduce((acc, product, index) => {
    if (index === products.length - 1) return acc.concat('(?, ?, ?)');
    return acc.concat('(?, ?, ?), ');
  }, '');

  const values = products.reduce((acc, product) => ([...acc, id, product.id,
    product.quantity]), []);

  const query = `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES ${valuesPlaces}`;

  const [{ insertId }] = await connection.execute(query, values);

  return ({ id: insertId });
};

const updateSale = async ({ id }) => {
  const query = 'UPDATE Trybeer.sales SET status = ? WHERE id = ?';
  const values = ['delivered', id];

  const result = await connection.execute(query, values);

  return result;
};

module.exports = {
  createSale,
  createSalesProducts,
  getAll,
  getSalesByUserId,
  getSaleById,
  updateSale,
};
