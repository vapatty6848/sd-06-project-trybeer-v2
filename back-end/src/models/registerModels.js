const connection = require('../database/connection');

// Create a user
const createUser = async (name, email, password, role) => {
  const [user] = await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role],
  );
  return user;
};

// Delete a user
const excludeUser = async (id) => {
  await connection.execute('DELETE FROM users WHERE id = (?)', [id]);
};

// Edit a user
const editUser = async (nextName, prevName) => {
  const [user] = await connection.execute(
    'UPDATE users SET name = ? WHERE name = ?',
    [nextName, prevName],
  );
  return user;
};

module.exports = { 
  createUser,
  excludeUser,
  editUser,
};
