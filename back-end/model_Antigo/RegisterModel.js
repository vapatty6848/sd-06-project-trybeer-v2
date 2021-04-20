const connection = require('../database/connection');

const getUserByEmail = async (email) => connection
  .execute('SELECT * FROM users WHERE email = ?', [email]);

const createRegister = async (body) => {
  const { name, email, password, role } = body;
  const [result] = await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role],
  );
  return { ...body, id: result.insertId };
};

module.exports = { createRegister, getUserByEmail };