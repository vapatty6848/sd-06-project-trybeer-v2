const logout = () => (
  localStorage.removeItem('user')
);

const setUser = (user) => {
  localStorage.setItem('token', JSON.stringify(user));
};

const clearStorage = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};

const updateCartQtd = (updateCartProduct) => {
  localStorage.setItem('Cart', JSON.stringify(updateCartProduct));
};

const getCartProducts = () => {
  const cartProducts = JSON.parse(localStorage.getItem('Cart'));
  if (cartProducts) return cartProducts;
  localStorage.setItem('Cart', JSON.stringify([]));
  return [];
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
  setUser,
  clearStorage,
  updateCartQtd,
  getCartProducts,
  getStorageToken,
};
