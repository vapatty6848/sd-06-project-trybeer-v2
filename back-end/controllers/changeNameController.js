const { Router } = require('express');
const changeNameService = require('../services/changeNameService');

const router = Router();

router.put('/changeName', (req, res) => {
  const { name, email } = req.body;

  try {
    changeNameService(name, email);
    return res.status(200).json({ name });
  } catch (error) {
    return res.status(500).json({ message: 'erro interno' });
  }
});

module.exports = router;
