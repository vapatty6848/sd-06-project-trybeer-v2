import { getToken } from './usersServices';

export default checkUserRedirect = async (history) => {
  const storageUser = JSON.parse(localStorage.getItem('user'));
  if (storageUser) {
    const user = await getToken(storageUser.token);
    if (user.role === 'client') {
      history.push('/products');
    } else if (user.role === 'admin' || user.role === 'administrator') {
      history.push('/admin/orders');
    }
  } else {
    history.push('/login');
  }
};
