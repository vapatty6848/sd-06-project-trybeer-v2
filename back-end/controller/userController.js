const { Router } = require('express');
const rescue = require('express-rescue');
const userService = require('../service/userService');
const { validatePassword,
  validateEmail,
  nameValidation } = require('../middlewares/userValidation');

const createToken = require('../auth/createToken');

const router = Router();

router.post('/login', validatePassword, validateEmail, rescue(async (req, res) => {
  const { email, password } = req.body;
  const getUser = await userService.findUserByEmailAndPassword(email, password);
  if (getUser.isError) {
    return res.status(getUser.status).json({ message: getUser.message });
  }

  const userDataForFront = {
    name: getUser.name,
    email: getUser.email,
    role: getUser.role,
  };

  const userToken = createToken(userDataForFront);

  return res.status(200).json([userDataForFront, userToken]);
}));

  router.post('/register',
  validatePassword, validateEmail, nameValidation, rescue(async (req, res) => {
  const { name, email, password, role } = req.body;
  await userService.createUser(name, email, password, role);
  const user = await userService.findUserByEmailAndPassword(email, password);
  
  const userDataForFront = {
    id: user.id,
    name,
    email,
    role,
  };

  const userToken = createToken(userDataForFront);
  console.log(userToken);
  return res.status(201).json({ userToken });
}));

router.put('/', rescue(async (req, res) => {
  const { email, name } = req.body;

  await userService.updateUserNameByEmail(email, name);

  return res.status(201).json({ message: 'Name has been successfully updated.' });
}));

module.exports = router;
