const connection = require('./connection');

const createMessage = (bodyMessage) => connection().then((db) => 
  db.collection('messages').insertOne(bodyMessage));

const getAllById = (talkId) => connection().then((db) => db.collection('messages')
.find({ talkId }).toArray());

const getAllByGroup = () => connection().then((db) => db.collection('messages')
.aggregate([
{ $match: { nickname: { $not: { $regex: 'Loja' } } } },
{ $group: 
  { _id: '$talkId',
  nick: { $last: '$nickname' },
  hour: { $last: '$hour' },
  message: { $last: '$message' },
  }, 
}, 
{ $project: { talkId: '$_id', nickname: '$nick', time: '$hour' } }, 
{ $sort: { time: -1 } },
]).toArray());

module.exports = {
  createMessage,
  getAllById,
  getAllByGroup,
};
// db.messages.aggregate([{$group:{_id:"$talkId",time:{$last:"$hour"},message:{$last:"$message"}}}])