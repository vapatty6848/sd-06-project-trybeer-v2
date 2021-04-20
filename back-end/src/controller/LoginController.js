const rescue = require('express-rescue');
const { LoginService } = require('../service');

const generateToken = rescue(async (req, res) => {
  const { email } = req.body;

  const user = await LoginService.generateToken(email);

  return res
    .status(200)
    .json(user);
});

module.exports = {
  generateToken,
};