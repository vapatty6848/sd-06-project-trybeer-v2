const { user: User } = require('../models');
const { NOT_FOUND } = require('../schema/statusSchema');

// Verify user by email and password
// const verifyUser = async (email, password) => {
//   const user = await userModel.verifyUser(email, password);
//   return user;
// };

// Email exist?
// const emailExist = async (req, res, next) => {
//   const { email } = req.body;
//   const [exist] = await userModel.findByEmail(email);

//   if (exist) {
//     res.status(CONFLICT).json({ message: 'E-mail already in database.' });
//   }

//   next();
// };

// Verify id
const verifyId = async (req, res, next) => {
  const { id } = req.params;
  const exist = await User.findByPk(id);

  if (!exist) {
    res.status(NOT_FOUND).json({ message: 'incorrect id' });
  }

  next();
};

module.exports = {
  // getAll,
  // createNewUser,
  // verifyUser,
  // emailExist,
  // findById,
  // update,
  verifyId,
};
