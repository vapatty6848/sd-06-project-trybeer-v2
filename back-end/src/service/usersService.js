// const { user } = require('../database/models');
const Validations = require('./validations');
const Utils = require('./utils');

// // GET ALL USERS ON DB---------------------------------------------------------
// const getAll = async () => {
//   const result = await usersModel.getAll();
//   return result;
// };

// LOGIN-----------------------------------------------------------------------
const loginUser = async ({ email, password }) => {
  const userInfo = await Validations.loginValidation({ email, password });

  if (userInfo.payload) return userInfo;
  const { id, name, role } = userInfo;
  const token = Utils.generateToken({ id, role });

  return ({ id, name, role, token });
};

// // CREATE USER-----------------------------------------------------------------
// const createUser = async ({ name, email, password, role }) => {
//   const validation = await Validations.newUserValidation({
//     name, email, role,
//   });

//   if (validation.payload) return validation;

//   const result = await usersModel.createUser({ name, email, password, role });

//   const { id: responseId, name: responseName, role: responseRole } = result;
//   const token = Utils.generateToken({ id: responseId, role: responseRole });

//   return ({ id: responseId, name: responseName, role: responseRole, token });
// };

// // UPDATE USER-----------------------------------------------------------------
// const updateUser = async ({ name, email, token }) => {
//   const tokenStatus = await Validations.tokenValidation(token);

//   if (tokenStatus.payload) return tokenStatus;

//   const result = await usersModel.updateUser({ name, email });
//   const { name: responseName } = result;

//   return ({ name: responseName });
// };

module.exports = {
  // getAll,
  loginUser,
  // createUser,
  // updateUser,
};
