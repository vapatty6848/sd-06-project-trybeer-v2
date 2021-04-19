const BAD_REQUEST = 400;

const notValidSale = {
  payload: { message: 'The sale is address.' },
  status: BAD_REQUEST,
};

const addressValidation = ({ address, number }) => {
  if (!address || !number) return notValidSale;
  return true;
};

module.exports = addressValidation;
