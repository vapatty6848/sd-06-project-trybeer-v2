const { createUser, createSales } = require('../models');

const getEmailService = async (emailLogin) => {
  const resultService = await createUser.findOne({
    where: { email: emailLogin },
  });
  return resultService;
};

const registerUserService = async (body) => {
  const verifyEmail = await createUser.findOne({
    where: { email: body.email },
  });
  if (verifyEmail.length) return false;
  // obs ver se precisa desestruturar o objeto.
  const resultService = await createUser.create(body);
  return resultService;
};

const updateUserName = async (newUserName, email) => {
  const updatedUser = await createUser.update(
    { name: newUserName },
    {
      where: { email },
    },
  );

  return updatedUser;
};

const allUserOrdersService = async (email) => {
  const user = await createUser.findOne({
    where: {
      email,
    },
  });
  const userId = user[0].id;
  const userOrders = await createSales.findAll({
    where: {
      userId,
    },
  });
  return userOrders;
};

module.exports = {
  getEmailService,
  registerUserService,
  updateUserName,
  allUserOrdersService,
};
