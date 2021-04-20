const jwt = require('jsonwebtoken');
const { users } = require('../../database/sequelize/models');
require('dotenv').config();

const secret = '723y78yrfd3gtg47gf673t1yhfbto46378w32';
const jwtSecret = process.env.JWT_SECRET || secret;

const checkToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token expirado ou inválido' });

    const { id } = decoded;
    const user = await users.findByPk(id);

    if (!user) return res.status(401).json({ message: 'Token expirado ou inválido' });
    req.user = user;
    next();
  });
};

module.exports = checkToken;