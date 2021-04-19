const express = require('express');
const cors = require('cors');
const RegisterController = require('./controllers/RegistersController');
const ProductsController = require('./controllers/ProductsController');
const LoginController = require('./controllers/LoginController');
const { isUserLoggedIn, isUserAdmin } = require('./middlewares/validations');
const handleError = require('./middlewares/handleError');
const OrdersController = require('./controllers/OrdersController');
const AdminController = require('./controllers/AdminController');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/register', RegisterController);
app.use('/products', ProductsController);
app.use('/login', LoginController);
app.use('/orders', OrdersController);
app.use('/admin', isUserLoggedIn, isUserAdmin, AdminController);

app.use('/images', express.static(__dirname.concat('/images')));

app.use(handleError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));