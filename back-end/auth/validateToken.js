const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'dara secret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token não encontrado!' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findUserByEmail(decoded.data.email);

    if (!user) return res.status(401).json({ message: 'erro ao procurar usuário token' });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'erro ao procurar usuário token' });
  }
};
