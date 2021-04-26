const { Router } = require('express');
const model = require('../modelsMongo/model');

const router = Router();

router.post('/getchat', async (req, res) => {
  try {
    const { email } = req.body;
    const messages = await model.getAllByEmail(email);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/getallchat', async (req, res) => {
  try {
    const messages = await model.getAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
