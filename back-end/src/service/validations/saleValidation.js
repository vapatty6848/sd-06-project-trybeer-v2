const BAD_REQUEST = 400;

const notValidSale = {
  payload: { message: 'The sale is missing total price or customer identity.' },
  status: BAD_REQUEST,
};

const saleValidation = async ({ customerId, total }) => {
  if (!customerId || !total) return notValidSale;
  return true;
};

module.exports = saleValidation;
