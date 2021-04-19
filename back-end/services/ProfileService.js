const tokenValidation = require('../utils/tokenValidation');
const { OK } = require('../utils/allStatusCode');
const { updateProfile } = require('../models/ProfileModel');

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

  await updateProfile(id, name);
  return res.status(OK).json({ name });
};

module.exports = { ProfileUpdateService };