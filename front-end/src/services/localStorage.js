export const getUserInfo = () => {
  const result = JSON.parse(localStorage.getItem('user'));

  return result;
};