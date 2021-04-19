// const userModel = require('../model/userModel');
const { users } = require('../models');

// const UNPROCESSABLE_ENTITY = 422;

const findUserByEmailAndPassword = (userEmail, userPassword) => users.findAll({
  where: {
    email: userEmail,
    password: userPassword,
  },
});
/* const findUserByEmailAndPassword = async (email, password) => {
  const userFound = await userModel.findUserByEmail(email);  

  if (!userFound || userFound.password !== password) {
    return {
      status: UNPROCESSABLE_ENTITY,
      message: 'Email or password not found',
      isError: true,
    };
  }
  return userFound;
}; */

const findUserByEmail = (userEmail) => users.findAll({
  where: { email: userEmail },
});
/* const findUserByEmail = async (email) => {
  const user = await userModel.findUserByEmail(email);
  return user;
}; */

const updateUserNameByEmail = (userEmail, updatedName) => users.update(
  { name: updatedName },
  {
    where: { email: userEmail },
  },
);
/* const updateUserNameByEmail = async (userEmail, updatedName) => {
  await userModel.updateUserNameByEmail(userEmail, updatedName);
}; */

const createUser = async (user) => users.create(user);
/* const createUser = async (name, email, password, role) => {
  const userFound = await userModel.findUserByEmail(email);  
  if (userFound) {
    return {
      status: UNPROCESSABLE_ENTITY,
      message: 'Email alredy exists ',
      isError: true,
    };
  }
  await userModel.createUser(name, email, password, role);
}; */

module.exports = {
  findUserByEmailAndPassword,
  findUserByEmail,
  updateUserNameByEmail,
  createUser,
};
