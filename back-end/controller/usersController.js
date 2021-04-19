const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validateToken, SECRET } = require('../middlewares/helpers');
const { findUserByEmail,
  registerUser, editUser } = require('../models/usersModel');

const usersRouter = new Router();

usersRouter.get('/', validateToken, async (req, res) => {
  const { email } = req.user;
  const user = await findUserByEmail(email);

  res.status(200).json(user);
});

usersRouter.post('/', async (req, res) => {
  const { email } = req.body;
  const userFound = await findUserByEmail(email);
  if (userFound) {
    const { id, name, password, role } = userFound;
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ data: { email, role } }, SECRET, jwtConfig);
    return res.status(200).json({ id, name, password, role, token });
  }
  return res.status(404).send({ message: 'E-mail not found.' });
});

usersRouter.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  
  const obj = {
    name,
    email,
    password,
    role,
  };
  const [{ insertId }] = await registerUser(obj);

  const token = jwt.sign({ data: { email, role } }, SECRET, jwtConfig);

  return res.status(201).json({ token, insertId });
});

usersRouter.put('/edit', async (req, res) => {
  await editUser(req.body);
  return res.status(201).send(req.body);
});

module.exports = usersRouter;
