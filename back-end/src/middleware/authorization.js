const jwt = require('jsonwebtoken');
const { users } = require('../database/models');
require('dotenv/config');

const secret = process.env.TOKEN_SECRET || 'segredodogrupo7';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: 'missing auth token' });
    return;
  }

  try {
    jwt.verify(authorization, secret, async (err, email) => { 
      if (err) return res.status(401).json({ message: 'jwt malformed' });
      const user = await users.findOne({ where: { email: email.data } });

      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};
