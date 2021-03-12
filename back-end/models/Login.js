const connection = require('./Connection');

const getByEmail = async (userEmail) => {
  const [[email]] = await connection.execute('SELECT * FROM users WHERE email = ?', [userEmail]);
  return email;
};

module.exports = {
  getByEmail,
};
