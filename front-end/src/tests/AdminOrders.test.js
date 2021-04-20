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
  productName: "Skol Lata 250ml",
  productPrice: "2.20",
  productQuantity: "1",
  productStatus: "Entregue",
  saleDate: "2021-03-29T20:56:08.000Z",
  saleId: 1,
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
    id: 1, status: 'Pendente',
    total_price: '2.20',
    delivery_address: 'rua Trybe',
    delivery_number: '40'
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
    expect(await (await screen.findAllByRole('button'))[3].textContent).toBe('Pedido 1rua Trybe, 40R$ 2,20Pendente')
    fireEvent.click(await (await screen.findAllByRole('button'))[3]);
    expect(await screen.findByText('Skol Lata 250ml')).toBeInTheDocument();
    userEvent.click(await screen.findByTestId('mark-as-delivered-btn'));
    expect(await screen.findByText('Entregue')).toBeInTheDocument();
    userEvent.click(await screen.findByText('Meu Perfil'));
    expect(await screen.findByText('Perfil')).toBeInTheDocument();
    userEvent.click(await screen.findByText('Meus Pedidos'));
    expect(await screen.findByText('Pedido 1')).toBeInTheDocument();
    userEvent.click(await screen.findByText('Sair'));
    expect(await screen.findByText('Entrar')).toBeInTheDocument();
  });
});

