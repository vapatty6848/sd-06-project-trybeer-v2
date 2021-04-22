const getEmailLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.email;
};

const getHour = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
};

const formatMessage = (message) => {
  const user = getEmailLocalStorage();
  const hour = getHour();
  return { user, hour, message };
};

export default formatMessage;
