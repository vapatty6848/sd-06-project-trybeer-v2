const { Router } = require('express');
const { users } = require('../models');

const routerProfile = Router();

routerProfile.get('/', async (_req, res) => {
  const user = await users.findAll();
  res.send(user);
});

routerProfile.post('/', async (req, res, next) => {
  const { email, newName } = req.body.user;
  try {    
    await users.update(
      { name: newName },
      { where: { email } },
      ); 
    // console.log(user);
    // 0 = nao encontrou ou nao alterou 1=alterado com sucesso
    const { dataValues } = await users.findOne({ where: { email } });
    console.log(dataValues);
    const { name } = dataValues;
    return res.status(200).json({ name, email });
  } catch (err) {
    const error = 'Usuario não encontrado';
    err.message = error;
    next(err);
  }
});

module.exports = routerProfile;