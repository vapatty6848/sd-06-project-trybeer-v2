const { users } = require('../database/models');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await users.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return res
      .status(404)
      .json({ message: 'Invalid email or password' });
  }

  next();
};
