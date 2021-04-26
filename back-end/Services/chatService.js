const chat = require('../Model/chat');

const saveMessage = async (req, res) => {
  const { message, email, timestamp, role } = req.body;

  await chat.saveMessage(message, email, timestamp, role);

  return res.status(200).send('OK');
};

const getMessages = async (_req, res) => {
  const messages = await chat.getMessages();

  return res.status(200).json(messages);
};

module.exports = { saveMessage, getMessages };
