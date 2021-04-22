const httpServer = require('./src/server');
require('dotenv/config');

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => console.log(`Running on port ${PORT}`));