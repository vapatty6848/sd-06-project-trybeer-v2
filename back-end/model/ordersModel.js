const connection = require('./connection');

const createOrders = async (userId, objOrder) => {
  try {
    return await connection.execute('INSERT INTO Trybeer.sales ' 
      + '(user_id, total_price, delivery_address, delivery_number, sale_date, status) ' 
      + 'VALUES (?,?,?,?,?,?)', [
      userId,
      objOrder.totalPrice,
      objOrder.address,
      objOrder.number,
      objOrder.date,
      objOrder.orderStatus,
    ]);
  } catch (error) {
    console.error(error.message);
  }
};

const getOrders = async (userId) => {
  const [sales] = await connection.execute(
    'SELECT * FROM Trybeer.sales WHERE user_id=?', [userId],
  );
  return sales;
};

const getLastSaleId = async () => {
  const [[lastSaleId]] = await connection.execute(
    'SELECT MAX(id) lastSaleId FROM Trybeer.sales',
  );
  return lastSaleId;
};

const createProductsSales = async (mySaleProducts) => {
  try {
    await connection.execute(
      'INSERT INTO Trybeer.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)', [
        mySaleProducts.saleId,
        mySaleProducts.productId,
        mySaleProducts.quantity,
      ],
    );
  } catch (error) {
    console.error(error.message);
  }
};

const getSaleDetail = async (saleId) => {
  const [saleDetail] = await connection.execute(
    'SELECT * FROM Trybeer.sales '
    + 'INNER JOIN Trybeer.sales_products ON Trybeer.sales.id = Trybeer.sales_products.sale_id '
    + 'INNER JOIN Trybeer.products ON Trybeer.products.id = Trybeer.sales_products.product_id '
    + 'WHERE sale_id=?', [saleId],
  );
  // console.log('entrei no detalhe do produto', saleDetail);
  return saleDetail;
};

const getAllSales = async () => {
  const [allSales] = await connection.execute(
    'SELECT * FROM Trybeer.sales ',
  );
  // console.log('entrei nos detalhes dos produtos', allSales);
  return allSales;
};

const updateSale = async (saleId) => {
  await connection.execute(
    'UPDATE Trybeer.sales SET Trybeer.sales.status=? WHERE Trybeer.sales.id=?', 
    ['Entregue', saleId],
  );
  // console.log('entrei no orders model', saleId);
};

module.exports = {
  createOrders,
  getOrders,
  getLastSaleId,
  createProductsSales,
  getSaleDetail,
  getAllSales,
  updateSale,
};
