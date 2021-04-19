const connection = require('./connection');

// const getAll = async () => {
//   const query = 'SELECT * FROM Trybeer.users';
//   const [users] = await connection.execute(query);
//   return users;
// };

const getById = async (id) => {
  const query = 'SELECT * FROM Trybeer.users WHERE id=?';
  const [users] = await connection.execute(query, [id]);
  return users;
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM Trybeer.users WHERE email=?';
  const [users] = await connection.execute(query, [email]);
  return users;
};

const createUser = async ({ name, email, password, role }) => {
  const query = 'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)';
  const [{ insertId }] = await connection.execute(query, [name, email, password, role]);

  return {
    id: insertId,
    name,
    role,
  };
};

const updateUser = async ({ name, email }) => {
  const query = 'UPDATE users SET name=? WHERE email=?';
  await connection.execute(query, [name, email]);

  return {
    name,
  };
};

module.exports = {
  // getAll,
  getUserByEmail,
  createUser,
  updateUser,
  getById,
};
