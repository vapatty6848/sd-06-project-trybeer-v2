const jwt = require('jsonwebtoken');

const secret = 'nossosegredo';

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) return next(400, 'Token não encontrado ou informado');
  try {
    const decoded = jwt.verify(authorization, secret);
    // const user = await model.findUser(decoded.data.username);
    // if (!user) {
    //   return res
    //     .status(401)
    //     .json({ message: 'Erro ao procurar usuário do token.' });
    // }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = validateToken;
