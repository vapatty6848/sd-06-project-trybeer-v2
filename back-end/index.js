const app = require('./src/server');
require('dotenv/config');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));