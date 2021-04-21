const getUserInfo = () => {
  const result = JSON.parse(localStorage.getItem('user'));

  return result;
};

export default getUserInfo;
