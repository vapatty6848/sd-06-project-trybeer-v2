import api from '../services';
import yupSchemas from './yupSchemas';
import redirectUser from './redirectUser';

const handleSubmit = async ({ action, login, setToken, history }) => {
  const valid = await yupSchemas.login.isValid(login);
  if (valid) {
    const newUser = await api.user(action, login);
    redirectUser(newUser, history, setToken);
  }
};

export default handleSubmit;
