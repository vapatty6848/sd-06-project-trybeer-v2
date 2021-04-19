const createSales = (sequelize, Datatypes) => {
  const Sale = sequelize.define('sales', {
    user_id: Datatypes.NUMBER,
    total_price: Datatypes.NUMBER,
    delivery_address: Datatypes.STRING,
    delivery_number: Datatypes.STRING,
    sale_date: Datatypes.DATE,
    status: Datatypes.STRING,
  });
  return Sale;
};

module.exports = createSales;
