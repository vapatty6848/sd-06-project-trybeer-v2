const { users } = require('../database/models');

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const [emailAlreadyExists] = await users.findOne({ where: { email } });

  if (emailAlreadyExists !== undefined) {
    return res
    .status(409)
    .json({ message: 'E-mail already in database.' });
  }
  next();
};
