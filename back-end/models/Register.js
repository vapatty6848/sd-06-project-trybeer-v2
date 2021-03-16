const connection = require('./Connection');

const createUser = async ({ name, email, password, role }) => connection
  .execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]);
    
const updateName = async ({ name, email }) => connection
  .execute('UPDATE users SET name = ? WHERE email= ?', [name, email]);

module.exports = {
  createUser,
  updateName,
};