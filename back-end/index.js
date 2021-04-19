const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./src/controllers/UserController');
const productsRouter = require('./src/controllers/ProductController');
const salesRouter = require('./src/controllers/SalesController');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();
const port = 3001;

app.use(cors()); 
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/images', express.static(`${process.cwd()}/images`)); 

app.use(errorMiddleware);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
