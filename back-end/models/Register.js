const connection = require('./Connection');

const createUser = async ({ name, email, password, role }) => connection
  .execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]);

module.exports = {
  createUser,
};