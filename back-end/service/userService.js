const { users } = require('../models');

const UNPROCESSABLE_ENTITY = 422;

const findUserByEmailAndPassword = async (userEmail, userPassword) => {
  const userFound = await users.findOne({
    where: {
      email: userEmail,
      password: userPassword,
    },
  });
  if (!userFound) {
    return {
      status: UNPROCESSABLE_ENTITY,
      message: 'Email or password not found',
      isError: true,
    };
  }
  return userFound.dataValues;
};

const findUserByEmail = (userEmail) => users.findOne({
  where: { email: userEmail },
});

const updateUserNameByEmail = (userEmail, updatedName) => users.update(
  { name: updatedName },
  { where: { email: userEmail } },
);

const createUser = async (user) => {
  const userFound = await findUserByEmail(user.email);
  if (userFound) {
    return {
      status: UNPROCESSABLE_ENTITY,
      message: 'Email alredy exists ',
      isError: true,
    };
  }
  return users.create(user);
};

module.exports = {
  findUserByEmailAndPassword,
  findUserByEmail,
  updateUserNameByEmail,
  createUser,
};
