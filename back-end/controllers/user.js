const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = 'dara secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });
    }

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const token = jwt.sign({ data: [email, password] }, secret, jwtConfig);

    const user = await userService.findUserByEmail(email);
    if (user 
      && user.email === email) return res.status(409).json({ message: 'Email already registered' });

    await userService.create(name, email, password, role);

    const findNeWUser = await userService.findUserByEmail(email);
    const userObject = { ...findNeWUser, token };

    return res.status(201).json({ user: userObject });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  login,
  register,
};
