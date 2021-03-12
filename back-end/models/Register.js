const connection = require('./Connection');

const createUser = async ({ name, email, password, role }) => {
  const user = await connection
    .execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]);
  return user;
};

module.exports = {
  createUser,
};