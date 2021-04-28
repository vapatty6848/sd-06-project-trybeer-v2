const { app, http } = require('./app');
require('dotenv/config');

const PORT = process.env.PORT || 3001;
const CHAT_PORT = process.env.CHAT_PORT || 4001;

app.listen(PORT, () => console.log(`App on at port ${PORT}`));
http.listen(CHAT_PORT, () => console.log(`Chat on at port ${CHAT_PORT}`));
