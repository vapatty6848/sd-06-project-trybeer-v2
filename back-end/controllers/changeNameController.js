const { Router } = require('express');
const { users } = require('../models');

const router = Router();

router.put('/changeName', async (req, res) => {
  const { name, email } = req.body;

  try {
    await users.update(
      { name },
      { where: { email } },
    );
    return res.status(200).json({ name });
  } catch (error) {
    return res.status(500).json({ message: 'erro interno' });
  }
});

module.exports = router;
