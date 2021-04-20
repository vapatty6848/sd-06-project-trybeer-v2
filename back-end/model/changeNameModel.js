const connection = require('./connection');

const changeName = async (name, email) => {
  connection.execute(
    'UPDATE users SET name = ? WHERE email = ?', [name, email],
  );
};

module.exports = changeName;
