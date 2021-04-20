const { Router } = require('express');
const rescue = require('express-rescue');
const LoginService = require('../service/LoginService');
// const createToken = require('../authentication/createToken');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.post('/', rescue(async (req, res) => {
  const user = req.body;
  // const { name, email, role } = user;
  const requestedUser = await LoginService.getByEmail(user.email);

  if (requestedUser) {
    return res.status(BAD_REQUEST).json({ message: 'E-mail already in database.' });
  }

  await LoginService.create(user);
  // const token = await createToken({ email, role });

  // return res.status(OK).json({ token, role, name, email });
  return res.status(OK).json({ message: 'User Created' });
}));

module.exports = router;
