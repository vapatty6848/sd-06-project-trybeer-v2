import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import api from '../services/api'
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
jest.mock('../services/api');

const userApi = {
  id: 1, name: "admin", email: "admin@test.com", role: "administrator",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoid…TEzfQ.8As_I2Uz1z0S8p4APwPDH5flGwifoEoOx9CJgcQGCV8"
}

const orders = [{
  saleId: 1,
  products:[{
  name: "Skol Lata 250ml",
  price: "2.20",
  salesProducts:{ quantity: "1"}
  }], 
  status: "Entregue",
  saleDate: "2021-03-29T20:56:08.000Z",
  totalPrice: '2.20',
}];

const resultResolved = { response: userApi, result: true };
const resultOrderByUser = orders;


api.getAllProducts.mockImplementation(() => Promise.resolve([]));
api.registerUser.mockImplementation(() => Promise.resolve(resultResolved));
api.generateToken.mockImplementation(() => Promise.resolve(resultResolved));
api.getOrdersById.mockImplementation(() => Promise.resolve(resultOrderByUser));
api.getAllOrders.mockImplementation(() => Promise.resolve([
  {
    id: 1,
    name:"Skol Lata 250ml",
    status: 'Pendente',
    totalPrice: '2.20',
    deliveryAddress: 'rua Trybe',
    deliveryNumber: '40'
  }]));


const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router path="/login" history={history}>{component}</Router>), history,
  });
};

describe('Testa a página de Admin Orders', () => {
  it('Verifica se é possível visualizar as Orders e fazer update do status', async () => {
    renderWithRouter(<App />);
    const inputEmail = await screen.findByTestId('email-input');
    const inputSenha = await screen.findByTestId('password-input');
    const buttonEntrar = await screen.findByText('Entrar');
    expect(buttonEntrar).toBeDisabled();
    userEvent.type(inputEmail, 'user@test.com');
    userEvent.type(inputSenha, '414141');
    expect(buttonEntrar).not.toBeDisabled();
    fireEvent.click(buttonEntrar);
    expect(await screen.findByTestId('side-menu-item-orders'));
    expect(await screen.findByTestId('side-menu-item-profile'));
    expect(await screen.findByTestId('side-menu-item-logout'));
    const cardOrder = await screen.findByTestId('0-card-order');
    expect(await (await screen.findByTestId('0-order-status')).textContent).toBe('Pendente');
    fireEvent.click(cardOrder);
    expect(await screen.findByText('Skol Lata 250ml')).toBeInTheDocument();
    userEvent.click(await screen.findByTestId('mark-as-prepared-btn'));
    expect(await screen.findByText('Preparando')).toBeInTheDocument();
    userEvent.click(await screen.findByTestId('mark-as-delivered-btn'));
    expect(await screen.findByText('Entregue')).toBeInTheDocument();
    const buttonPerfil = await screen.findByText('Perfil');
    userEvent.click(buttonPerfil);
    userEvent.click(await screen.findByText('Pedidos'));
    expect(await screen.findByText('Pedido 1')).toBeInTheDocument();
    userEvent.click(await screen.findByText('Sair'));
    expect(await screen.findByText('Entrar')).toBeInTheDocument();
  });
});

