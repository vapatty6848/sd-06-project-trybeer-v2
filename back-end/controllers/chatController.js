const { Router } = require('express');
const model = require('../modelsMongo/model');

const router = Router();

router.post('/getchat', async (req, res) => {
  try {
    const { email } = req.body;
    const messages = await model.getAll(email);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
