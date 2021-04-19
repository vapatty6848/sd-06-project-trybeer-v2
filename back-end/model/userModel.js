const connection = require('./connection');

const findUserByEmail = async (userEmail) => {
  const [[user]] = await connection.execute(
    'SELECT * FROM Trybeer.users WHERE email=?', [userEmail],
  );
    return user;
};

const updateUserNameByEmail = async (userEmail, updatedName) => {
  await connection.execute(
    'UPDATE Trybeer.users SET Trybeer.users.name=? WHERE Trybeer.users.email=?', 
    [updatedName, userEmail],
  );
};

const createUser = async (name, email, password, role) => {
  await connection.execute(
    'INSERT INTO Trybeer.users (name, email, password, role) VALUE (?,?,?,?)',
    [name, email, password, role],
  );  
};

module.exports = {
  findUserByEmail,
  updateUserNameByEmail,
  createUser, 

};
