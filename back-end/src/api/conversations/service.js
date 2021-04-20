const model = require('./model');

const findOrCreate = async (userId) => {
  const conversation = await model.findOne('userId', userId);

  if (!conversation) {
    await model.create(userId);
    return { userId, messages: [] };
  }

  return conversation.messages;
};

const writeMessage = async ({ userId, text }) => {
  const conversation = await model.findOne('userId', userId);

  const currentMessages = conversation.messages;
  conversation.messages = currentMessages.push(text);

  conversation.save();
  return conversation.messages;
};

module.exports = {
  findOrCreate,
  writeMessage,
};
