const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validateToken, SECRET } = require('../middlewares/helpers');
const models = require('../models');

const usersRouter = new Router();

usersRouter.get('/', validateToken, async (req, res) => {
  const { email } = req.user;
  const user = await models.users.findOne({ where: { email } });

  res.status(200).json(user);
});

usersRouter.post('/', async (req, res) => {
  const { email } = req.body;
  const userFound = await models.users.findOne({ where: { email } });
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
  const createUser = await models.users.create(obj);
  const insertId = createUser.id;

  const token = jwt.sign({ data: { email, role } }, SECRET, jwtConfig);

  return res.status(201).json({ token, insertId });
});

usersRouter.put('/edit', async (req, res) => {
  const { name, email } = req.body;
  await models.users.update({ name }, {
    where: {
      email,
    },
  });
  return res.status(201).send(req.body);
});

module.exports = usersRouter;
