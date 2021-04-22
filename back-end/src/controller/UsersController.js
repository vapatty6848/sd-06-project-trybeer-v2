const { Router } = require('express');
const rescue = require('express-rescue');
const { Users } = require('../../models');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.post('/', rescue(async (req, res) => {
  const { name, email, password, role } = req.body;

  const requestedUser = await Users.findOne({ where: { email } });

  if (requestedUser) {
    return res.status(BAD_REQUEST).json({ message: 'E-mail already in database.' });
  }

  await Users.create({ name, email, password, role });

  return res.status(OK).json({ message: 'User Created' });
}));

module.exports = router;
