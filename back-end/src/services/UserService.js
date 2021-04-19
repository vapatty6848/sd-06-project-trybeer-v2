const {
  getEmail,
  registerUser,
  updateName,
  getAllUserOrders,
} = require('../models/UserModel');

const getEmailService = async (emailLogin) => {
  const resultService = await getEmail(emailLogin);
  return resultService;
};

const registerUserService = async (body) => {
  const verifyEmail = await getEmail(body.email);
  if (verifyEmail.length) return false;
  
  const resultService = await registerUser(body);
  return resultService;
};

const updateUserName = async (newUserName, email) => {
  const updatedUser = await updateName(newUserName, email);

  return updatedUser;
};

const allUserOrdersService = async (email) => {
  const user = await getEmail(email);
  const userId = user[0].id;
  const userOrders = await getAllUserOrders(userId);
  return userOrders;
};

module.exports = {
  getEmailService,
  registerUserService,
  updateUserName,
  allUserOrdersService,
};
