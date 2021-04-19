const BAD_REQUEST = 400;

const notValidProducts = {
  payload: { message: 'Invalid products in sale.' },
  status: BAD_REQUEST,
};

const productsValidation = async (products) => {
  const valid = products.map((product) => (product.id && product.quantity));
  if (valid.includes(false)) return notValidProducts;
  return true;
};

module.exports = productsValidation;
