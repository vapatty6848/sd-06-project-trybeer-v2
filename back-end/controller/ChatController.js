const { Router } = require('express');
const chat = require('../chat/Chat');

const ChatController = new Router();

ChatController.get('/', async (req, res) => {
    const messages = await chat.getAll();
    
    return res.json(messages);
});

ChatController.get('/users', async (req, res) => {
    const uniqueUsers = await chat.getAllUniqueUsers();
    const userMessages = uniqueUsers.map(async (user) => chat.getMostRecentMessageFromUser(user));
    console.log('userMessages', userMessages);

    const messages = await Promise.all(userMessages);
    
    return res.json(messages);
});

module.exports = ChatController;
