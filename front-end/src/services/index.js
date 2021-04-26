import { checkout, profile, login, register, updateName } from '../api';

const verifyEmailAndPassword = (email, password, setActiveBtn) => {
  const isEmailValid = email.match(/\S+@\S+\.\S+/);
  const isPasswordValid = password.match(/^[0-9a-zA-Z]{6,50}$/);

  if (isEmailValid && isPasswordValid) {
    setActiveBtn(true);
  } else setActiveBtn(false);
};

const handleSubmit = (history, user) => {
  login(user)
    .then(async (response) => {
      const isAdmin = response.data.role === 'administrator';
      localStorage.setItem('token', response.data.token);

      if (isAdmin) await history.push('admin/orders');
      else await history.push('/products');
    });
};

const verifyRegister = (user, setActiveBtn) => {
  const isEmailValid = user.email.match(/\S+@\S+\.\S+/);
  const isPasswordValid = user.password.match(/^[0-9a-zA-Z]{6,50}$/);
  const isNameValid = user.name.match(/^[a-zA-Z ]{12,50}$/);

  if (isEmailValid && isPasswordValid && isNameValid) {
    setActiveBtn(true);
  } else setActiveBtn(false);
};

const handleSubmitRegister = (user, checked, setUser, history) => {
  if (checked) {
    setUser({ ...user, role: 'administrator' });
    register({ ...user, role: 'administrator' })
      .then((result) => {
        if (result) history.push('admin/orders');
      });
  } else {
    setUser({ ...user, role: 'client' });
    register({ ...user, role: 'client' })
      .then((result) => {
        localStorage.setItem('token', result.data.token); // todo: verificar se este token está correto
        if (result) history.push('products');
      });
  }
};

const handleCheckbox = (checked, setChecked, setUser, user) => {
  if (checked) {
    setUser({ ...user, role: 'client' });
  } else setUser({ ...user, role: 'administrator' });
  setChecked(!checked);
};

const redirectMenuBar = (history, payloadUrl) => {
  history.push(payloadUrl);
};

const handleUpdate = (name, setShowMessage) => {
  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  const { id } = userFromStorage;

  updateName(name, id, setShowMessage)
    .then(setShowMessage(true));
};

const getItensStorage = () => {
  // https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
  const filterKeys = Object
    .keys({ ...localStorage })
    .filter((key) => key !== 'token')
    .filter((key) => key !== 'total')
    .filter((key) => key !== 'address')
    .filter((key) => key !== 'user');
  const items = Object.keys({ ...localStorage })
    .filter((key) => filterKeys.includes(key))
    .reduce((beerObject, key) => {
      beerObject[key] = { ...localStorage }[key];

      return beerObject;
    }, {});

  return items;
};

const calculateTotal = (items) => {
  let total = 0.00;
  const beersArray = Object.values(items);

  beersArray.forEach((obj) => {
    const parsedObject = JSON.parse(obj);
    total += parsedObject.total * parseFloat(parsedObject.price);
  });

  localStorage.setItem('total', total.toFixed(2));
  return total.toFixed(2);
};

const addProduct = ({ quantity, setQuantity, name, setTotal, price, id }) => {
  const total = quantity + 1;
  localStorage.setItem(`${name}`, JSON.stringify({ name, total, price, id }));
  setQuantity(total);
  const items = getItensStorage();
  setTotal(calculateTotal(items));
};

const reduceProduct = ({ quantity, setQuantity, name, setTotal, price, id }) => {
  if (quantity > 0) {
    const total = quantity - 1;
    localStorage.setItem(`${name}`, JSON.stringify({ total, price, id }));
    setQuantity(total);
    const items = getItensStorage();
    setTotal(calculateTotal(items));
  }
};

const tokenExists = (history) => {
  const token = localStorage.getItem('token');
  if (!token) {
    history.push('/login');
  }
};

const deleteItemCart = ({ product, setTotal, setItems }) => {
  console.log(product.name);
  localStorage.removeItem(product.name);
  const items = getItensStorage();
  setTotal(calculateTotal(items));
  setItems(Object.values(getItensStorage()));
};

const concludeOrder = async (totalPrice, addressObject, setShowSucessMessage,
  unformatedItems) => {
  const { address, number } = addressObject;
  localStorage.setItem('address', JSON.stringify(addressObject));
  const token = localStorage.getItem('token');
  const user = await profile(token);
  const { id: userId } = user;
  const items = unformatedItems.map((item) => JSON.parse(item));

  console.log(items);
  const params = { userId, totalPrice, address, number, items };
  checkout(params)
    .then(() => setShowSucessMessage(false));

  const itemsObject = getItensStorage();
  const itemNames = Object.keys(itemsObject);
  itemNames.map((itemName) => localStorage.removeItem(itemName));
  localStorage.removeItem('total');
  localStorage.removeItem('address');
};

export {
  verifyEmailAndPassword,
  handleSubmit,
  verifyRegister,
  handleCheckbox,
  handleSubmitRegister,
  redirectMenuBar,
  handleUpdate,
  addProduct,
  reduceProduct,
  tokenExists,
  getItensStorage,
  calculateTotal,
  deleteItemCart,
  concludeOrder,
};
