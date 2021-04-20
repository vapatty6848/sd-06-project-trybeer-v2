const model = require('./model');

const findOrCreate = async (userId) => {
  const conversation = await model.findOne('userId', userId);

  if (!conversation) {
    const newConversation = await model.create(userId);
    return newConversation.messages;
  }

  return conversation.messages;
};

const writeMessage = async ({ userId, text }) => {
  const conversation = await model.findOne('userId', userId);

  const currentMessages = conversation.messages;
  const newMessages = currentMessages.push(text);

  conversation.save();
  return conversation.messages;
};

module.exports = {
  findOrCreate,
  writeMessage
};
