const jwt = require('jsonwebtoken');
const models = require('../models');

const SECRET = 'grupo15';

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(req.headers.authorization, SECRET);
    const user = await models.user.findOne({ where: { email: decoded.data.email } });

    if (!user) return res.status(401).json({ message: 'Usuatio não logado' });

    req.user = decoded.data;
  } catch (err) {
    return res.status(401).json({ message: 'Error' });
  }

  next();
};

module.exports = { validateToken, SECRET };
