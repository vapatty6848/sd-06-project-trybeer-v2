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

const resultRejected = { response: { message: 'Invalid email or password' }, result: false }
const productsApi = [
  { id: '1', name: 'Skol Lata 250ml', price: '2.20', url_image: 'http://localhost:3001/images/Skol Lata 350ml.jpg' },
  { id: '2', name: 'Heineken 600ml', price: '50', url_image: 'http://localhost:3001/images/Heineken 600ml.jpg' },
  { id: '3', name: 'Antarctica Pilsen 300ml', price: '49', url_image: 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg' }
];

api.getAllProducts.mockImplementation(() => Promise.resolve([]));
api.updateNameOfUser.mockImplementation(() => Promise.resolve({ response: 'OK', result: true }));


describe('Testa a página de Meu Perfil', () => {

  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };

 beforeEach(() => {
    localStorage.cart = JSON.stringify([]);
    localStorage.user = JSON.stringify(userApi);
  });
  
  it('Verifica se renderiza corretamente Meu Perfil e atualiza o nome do usuário', async () => {
    api.generateToken = jest.fn().mockResolvedValue(resultResolved);
    await act(async () => {
    renderWithRouter(<App />);
    const inputEmail = await screen.findByTestId('email-input');
    const inputSenha = await screen.findByTestId('password-input');
    const buttonEntrar = await screen.findByText('Entrar');
    expect(buttonEntrar).toBeDisabled();
    userEvent.type(inputEmail, 'user@test.com');
    userEvent.type(inputSenha, '414141');
    expect(buttonEntrar).not.toBeDisabled();
    fireEvent.click(buttonEntrar);
    expect(await screen.findByText('TryBeer')).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId('top-hamburguer'));
    fireEvent.click(await screen.findByText('Meu perfil'));
    expect(await screen.findByText('Meu perfil')).toBeInTheDocument();
    expect(await (await screen.findByTestId('profile-name-input')).value).toBe('testuser');
    expect(await (await screen.findByTestId('profile-email-input')).value).toBe('user@test.com');
    expect(await screen.findByTestId('profile-save-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('profile-save-btn')).toBeDisabled();
    userEvent.type(await screen.findByTestId('profile-name-input'), 'testuser now');
    expect(await screen.findByTestId('profile-save-btn')).not.toBeDisabled();
    fireEvent.click(await screen.findByTestId('profile-save-btn'));
    expect(await screen.findByText('Atualização concluída com sucesso'));
    fireEvent.click(await screen.findByTestId('top-hamburguer'));
    fireEvent.click(await screen.findByText('Produtos'));
    expect(await screen.findByText('TryBeer'));
    });
  });
});
