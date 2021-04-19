const connection = require('./connection');

const findUserByEmail = async (email) => {
  const [[user]] = await connection.execute(
    'SELECT * FROM users WHERE email=?', [email],
  );
  return user;
};

const createUser = async (name, email, password, role) => {
  await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)',
    [name, email, password, role],
  );
};

module.exports = {
  findUserByEmail,
  createUser,
};
