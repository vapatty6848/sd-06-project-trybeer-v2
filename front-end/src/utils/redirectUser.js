export default (user, history, callback) => {
  if (!user || user.code) {
    return history.push({
      pathname: '/error',
      state: { ...user } });
  }
  if (user.role) {
    callback(user);
    if (user.role === 'administrator') history.push('/admin/orders');
    if (user.role === 'client') history.push('/products');
  }
};
