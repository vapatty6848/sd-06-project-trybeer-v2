const connection = require('./connection');

const getAllUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM Trybeer.users');

  return users;
};

const findUserByEmail = async (email) => {
  const [[
    userFound,
  ]] = await connection.execute('SELECT * FROM Trybeer.users WHERE email = ?', [email]);
  if (userFound) {
    return userFound;
  }
  return false;
};

const registerUser = async (user) => {
  const { name, email, password, role } = user;
  const register = await connection
    .execute('INSERT INTO Trybeer.users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]);
  return register;
};

const editUser = async (data) => {
  const { name, email } = data;
  const edit = await connection
    .execute('UPDATE Trybeer.users SET name = ? WHERE email = ?', [name, email]);
    return edit;
};

module.exports = {
  getAllUsers,
  findUserByEmail,
  registerUser,
  editUser,
};
