import fetchFunctions from '../api/fetchFunctions';

export const verifyToken = async (endpoint, user, history) => {
  if (user.token) {
    const { token } = user;
    const response = await fetchFunctions.get(endpoint, token);
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
