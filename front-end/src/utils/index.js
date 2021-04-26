export const getEmailLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.email;
};

const getHour = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const formatMessage = (message, client, store) => {
  const user = store || getEmailLocalStorage();
  const hour = getHour();
  const room = client;
  return { user, hour, message, room };
};
