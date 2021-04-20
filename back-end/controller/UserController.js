const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { verifyLogin, SECRET } = require('../middlewares/authToken');
const {
  getAll,
  emailExist,
  createNewUser,
  verifyId,
  findById,
  update,
} = require('../service/UserService');
const { User } = require('../models');
const { OK, CREATED, CONFLICT } = require('../schema/statusSchema');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const UserController = new Router();

// Get All Users
UserController.get('/', async (_req, res) => {
  const users = await User.findAll();
  res.status(OK).json({ Users: users });
});

// Create New User
UserController.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
      const newUser = await User.create({ name, email, password, role });
      const user = await User.findByPk(newUser.dataValues.id);
      const token = jwt.sign({ data: user.dataValues }, SECRET, jwtConfig);
      return res.status(CREATED).json({ token });
  } catch (error) {
      console.log(error)
      return res.status(CONFLICT).json({ message: 'email already in database' });
  }
});

// Get Profile
UserController.get('/profile', verifyLogin, async (req, res) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, SECRET, (_err, decoded) => {
    const dec = decoded.data;
    console.log('Usuario decodificado', dec);
    if (!decoded.data[0]) return res.status(OK).json(decoded.data);
    
    res.status(OK).json(dec);
  });
});

// Update
UserController.put('/:id', verifyId, verifyLogin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await User.update({ name }, { where: { id } });
  const user = await User.findByPk(id);
  const token = jwt.sign({ data: user }, SECRET, jwtConfig);
  res.status(OK).json({ token });
});

module.exports = UserController;
