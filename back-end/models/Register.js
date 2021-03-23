const connection = require('./Connection');

const createUser = async ({ name, email, password, role }) => connection
  .query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]).then((result) => result);
    
const updateName = async ({ name, email }) => connection
  .execute('UPDATE users SET name = ? WHERE email= ?', [name, email]);

module.exports = {
  createUser,
  updateName,
};