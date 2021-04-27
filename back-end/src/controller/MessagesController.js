const rescue = require('express-rescue');
const { MessagesService } = require('../service');
const chatUtils = require('../utils/chatUtils');

const createMessage = rescue(async (req, res) => {
const { body } = req;
const { params } = body;

const hour = chatUtils.getTime();

const newBody = {
talkId: params.key,
message: params.message,
nickname: params.from,
hour };
  const create = await MessagesService.create(newBody);
  return res
    .status(200)
    .json(create);
});

const findMessagesGroup = rescue(async (req, res) => {
const messages = await MessagesService.findByGroup();
  return res
    .status(200)
    .json(messages);
});

const findMessagesById = rescue(async (req, res) => {
const { id } = req.params;
const messagesById = await MessagesService.findById(id);
  return res
    .status(200)
    .json(messagesById);
});
module.exports = {
  createMessage,
  findMessagesGroup,
  findMessagesById,
};