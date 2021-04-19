const connection = require('../database/connection');

const validateLogin = async (email, password) => {
  const user = await connection.execute(
    'SELECT * FROM users WHERE email = ? AND password = ?', [email, password],
  );
  return user;
};

const findUserByEmail = async (email) => {
  const foundUser = await connection.execute(
    'SELECT * FROM users WHERE email = ?', [email],
  );
  return foundUser;
};

module.exports = {
  validateLogin,
  findUserByEmail,
};
