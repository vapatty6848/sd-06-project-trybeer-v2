const logout = () => localStorage.clear();

const setToken = (token) => {
  localStorage.setItem('token', token);
};

const clearCart = () => {
  localStorage.setItem('Cart', JSON.stringify([]));
};

const updateCart = (updatedCartProduct) => {
  localStorage.setItem('Cart', JSON.stringify(updatedCartProduct));
};

const getCartProducts = () => {
  const cartProducts = JSON.parse(localStorage.getItem('Cart'));
  return cartProducts;
};

const getStorageToken = () => {
  const authorization = JSON.parse(localStorage.getItem('token'));
  if (authorization) {
    return authorization.token;
  }
  return false;
};

module.exports = {
  logout,
  setToken,
  clearCart,
  updateCart,
  getCartProducts,
  getStorageToken,
};
