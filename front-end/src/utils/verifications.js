import fetchFunctions from '../api/fetchFunctions';

const messageError = 'Operation not authorized';
const invalidMessage = (message) => message.message === messageError;

export const verifyToken = async (endpoint, user, history) => {
  if (user.token) {
    const { token } = user;
    const response = await fetchFunctions.get(endpoint, token);
    if (invalidMessage(response)) return history.push('/login');
    return response;
  }
  return history.push('/login');
};

export const verifyEmailAndPassword = (email, password) => {
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
  const passwordMinLength = 6;
  const isEmailAndPasswordValid = password.length >= passwordMinLength && emailFormat;
  return isEmailAndPasswordValid;
};
