const http = require('./app');
require('dotenv/config');

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => console.log(`On na port ${PORT}`));
