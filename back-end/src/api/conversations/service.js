const model = require('./model');

const getAll = async () => {
  const conversations = await model.find();

  return ({ status: 200, payload: { conversations } });
};

const findOrCreate = async (userId, email) => {
  const conversation = await model.findOne('userId', userId);

  if (!conversation) {
    console.log(userId, email);
    await model.create(userId, email);
    return { userId, messages: [], email };
  }

  return conversation.messages;
};

const writeMessage = async ({ userId, text, sender = 'client' }) => {
  const conversation = await model.findOne('userId', userId)
    .then((data) => {
      const currentMessage = data.messages;
      currentMessage.push({ currMessage: text.currMessage, time: text.time, sender });
      return currentMessage;
    });

    const update = await model.update(userId, conversation);

  // if (conversation) {
  //   console.log(text);
  //   conversation.messages = [text];
  //   return conversation.messages;
  // }
  return update;
};

module.exports = {
  findOrCreate,
  writeMessage,
  getAll
};
