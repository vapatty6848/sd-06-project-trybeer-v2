const logout = () => localStorage.clear();

const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
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

module.exports = {
  logout,
  setToken,
  getToken,
  clearCart,
  updateCart,
  getCartProducts,
};
