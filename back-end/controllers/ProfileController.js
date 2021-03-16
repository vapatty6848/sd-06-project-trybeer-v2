const { Router } = require('express');
const rescue = require('express-rescue');
const { status200, RegisterService } = require('../services');

const ProfileRouter = new Router();

ProfileRouter.put('/', rescue(async (req, res) => {
  const { name, email } = req.body;
   await RegisterService.updateName({ name, email });
  return res.status(status200);
}));

module.exports = ProfileRouter;