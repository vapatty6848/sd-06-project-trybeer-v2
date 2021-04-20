const { Router } = require('express');
// const { updateName, getAll } = require('../models/UsersService');
const { Users } = require('../models');

const routerProfile = Router();

routerProfile.get('/', async (_req, res) => {
  // const users = await getAll();
  const user = await Users.findAll();
  res.send(user);
});

routerProfile.post('/', async (req, res) => {
  const { name, newName } = req.body.user;
  try {    
    // const [user] = await updateName(name, newName);  
    const user = await Users.update(
      { name: newName },
      { where: { name } },
      );  
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = routerProfile;