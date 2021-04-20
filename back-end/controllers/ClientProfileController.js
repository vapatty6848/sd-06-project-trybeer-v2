const { Router } = require('express');
const { users } = require('../models');

const routerProfile = Router();

routerProfile.get('/', async (_req, res) => {
  const user = await users.findAll();
  res.send(user);
});

routerProfile.post('/', async (req, res) => {
  const { name, newName } = req.body.user;
  try {    
    const user = await users.update(
      { name: newName },
      { where: { name } },
      );  
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = routerProfile;