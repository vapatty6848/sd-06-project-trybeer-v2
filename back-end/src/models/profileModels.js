const connection = require('../database/connection');

// Get all users
const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM Trybeer.users');
  return users;
};

// Edit a user
const editUserModels = async (name, email) => {
  // console.log(name, "nome");
  // console.log(email, "email");
  const [user] = await connection.execute(
    'UPDATE users SET name = (?) WHERE email = (?)',
    [name, email],
  );
  // console.log({user}, "linha 29");
  return user;
};

module.exports = {
  editUserModels,
  getAll,
};
