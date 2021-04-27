const MessagesModel = require('../database/mongoModels');

const create = async (bodyMessage) => MessagesModel.createMessage(bodyMessage);

const findByGroup = async () => MessagesModel.getAllByGroup();

const findById = async (talkId) => MessagesModel.getAllById(talkId);

module.exports = { 
  create,
  findByGroup,
  findById,
 };