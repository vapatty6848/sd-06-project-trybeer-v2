const connection = require('../database/connection');

const profileById = async (id) => connection.execute('SELECT * FROM users WHERE id = ?', [id]);

const updateProfile = async (id, name) => connection
  .execute('UPDATE users SET name = ? WHERE id = ?', [name, id]);

  module.exports = {
    updateProfile,
    profileById,
  };
