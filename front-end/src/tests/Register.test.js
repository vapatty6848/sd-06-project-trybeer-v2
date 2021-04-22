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
  id: 2, name: "testuser", email: "user@test.com", role: "client",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoid…TEzfQ.8As_I2Uz1z0S8p4APwPDH5flGwifoEoOx9CJgcQGCV8"
}

const resultResolved = { response: userApi, result: true }

api.getAllProducts.mockImplementation(() => Promise.resolve([]));
api.registerUser.mockImplementation(() => Promise.resolve(resultResolved));
api.generateToken.mockImplementation(() => Promise.resolve(resultResolved));
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

describe('Testa a página de Registro de cliente e admin', () => {
  it('Verifica se é possível cadastrar um cliente e redireciona para tela de produtos', async () => {
    await act(async () => {
      renderWithRouter(<App />);
      fireEvent.click(await screen.findByText('Ainda não tenho conta'));
      expect(await screen.findByText('Nome'));
      expect(await screen.findByText('Email'));
      expect(await screen.findByText('Senha'));
      expect(await screen.findByText('Quero vender'));
      expect(await screen.findByText('Cadastrar'));
      userEvent.type(await screen.findByTestId('signup-name'), 'Test da silva Trybe');
      userEvent.type(await screen.findByTestId('signup-email'), 'test@trybeer.com');
      userEvent.type(await screen.findByTestId('signup-password'), '123456');
      expect(await screen.findByTestId('signup-btn')).not.toBeDisabled();
      userEvent.click(await screen.findByText('Cadastrar'));
      expect(await screen.findByText('TryBeer'));
      fireEvent.click(await screen.findByTestId('top-hamburguer'));
      fireEvent.click(await screen.findByText('Sair'));
      expect(await screen.findByText('Entrar')).toBeInTheDocument();
    });
  });

  it('Verifica se é possível cadastrar um Admin e redireciona para tela de admin', async () => {
    renderWithRouter(<App />);
    fireEvent.click(await screen.findByText('Ainda não tenho conta'));
    userEvent.type(await screen.findByTestId('signup-name'), 'Test da silva Trybe');
    userEvent.type(await screen.findByTestId('signup-email'), 'admin@trybeer.com');
    userEvent.type(await screen.findByTestId('signup-password'), '123456');
    fireEvent.click(await screen.findByText('Quero vender'));
    expect(await screen.findByTestId('signup-btn')).not.toBeDisabled();
    userEvent.click(await screen.findByText('Cadastrar'));
    expect(await screen.findByTestId('side-menu-item-orders'));
    expect(await screen.findByTestId('side-menu-item-profile'));
    expect(await screen.findByTestId('side-menu-item-logout'));   
  });
});
