const model = require('./model');
const generateToken = require('../utils/generateToken');

const invalidReturn = ({ status: 400, payload: 'Invalid entries. Try again.' });

// LOGIN-----------------------------------------------------------------------
const login = async ({ body }) => {
  const { email, password } = body;

  if (!email || !password) return invalidReturn;

  const user = await model.findOne('email', email);

  if (!user) return ({ status: 401, payload: 'Not Found.' });

  if (user.password !== password) return invalidReturn;

  const { id, name, role } = user;
  const token = generateToken({ id, role });

  return ({ status: 200, payload: { id, name, role, token } });
};

// UPDATE - TROCA DE NOME------------------------------------------------------
const changeName = async ({ body, user }) => {
  const { name } = body;
  if (!name) return invalidReturn;
  
  const userToUpdate = user;
  userToUpdate.name = name;
  await userToUpdate.save();

  return ({ status: 200, payload: { name: userToUpdate.name } });
};

// CRIAÇÃO DE USUÀRIO----------------------------------------------------------
const create = async ({ body }) => {
  const { name, email, password, role } = body;

  const user = await model.findOne('email', email);

  if (user) return ({ status: 409, payload: 'User already exists.' });

  const newUser = await model.create({ name, email, password, role });

  if (!newUser) return ({ status: 500, payload: 'Internal error.' });

  return ({ status: 201, payload: newUser });
};

module.exports = { create, changeName, login };
