const { Router } = require('express');
const LoginService = require('../service/LoginService');
const createToken = require('../authentication/createToken');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.post('/', async (req, res) => {
  try {
    const user = req.body;
    const { role, email, name, password } = await LoginService.getByEmail(user.email);

    if (user.email === email && user.password === password) {
      const token = await createToken({ user: { email }, role });

      return res.status(OK).json({ token, role, name, email });
    }

    return res.status(BAD_REQUEST).json({ message: 'Wrong password' });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'User not found or wrong email' });
  }
});

module.exports = router;
