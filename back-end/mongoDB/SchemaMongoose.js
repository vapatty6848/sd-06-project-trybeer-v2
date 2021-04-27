const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  email: { type: String, required: true },
  messages: [
    {
      cli: { type: Boolean, required: true },
      date: { type: Date, required: true },
      message: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Chat', chatSchema);
