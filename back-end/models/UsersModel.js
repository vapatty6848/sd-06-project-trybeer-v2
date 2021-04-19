const connection = require('./connection');

const findByEmail = async (email) => {
  const [user] = await connection.execute(
    'SELECT * FROM users WHERE email=?', [email],
  );
  console.log(user);
  return user;
};

const createUser = async ({ name, password, email, role }) => {
  await connection.execute(
    'INSERT INTO users (name, password, email, role) VALUES (?, ?, ?, ?)',
    [name, password, email, role],
  );
  return ({
    name,
    password,
    email,
    role,
  });
};

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const update = async (name, email) => {
  await connection.execute(
    'UPDATE users SET name = ? WHERE email = ?',
    [name, email],
  );
};

module.exports = {
  findByEmail,
  createUser,
  getAll,
  update,
};
