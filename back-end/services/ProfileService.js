const tokenValidation = require('../utils/tokenValidation');
const { OK } = require('../utils/allStatusCode');
const { users } = require('../models');

// const ProfileAuthorization = async (req, res) => {
//   const { authorization } = req.headers;
//   const payload = tokenValidation(authorization);
//   const { name, email, role, id } = payload;
//   res.status(OK).json({ name, email, role, id });
// };

const ProfileUpdateService = async (req, res) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);
  const { id } = payload;
  const { name } = req.body;

  const ola = await users.update({ name }, { where: { id } });
  console.log(ola);
  return res.status(OK).json({ name });
};

module.exports = { ProfileUpdateService };