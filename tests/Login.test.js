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

// const productsApi = [
//   { id: '1', name: 'Skol Lata 250ml', price: '2.20', url_image: 'http://localhost:3001/images/Skol Lata 350ml.jpg' },
//   { id: '2', name: 'Heineken 600ml', price: '50', url_image: 'http://localhost:3001/images/Heineken 600ml.jpg' },
//   { id: '3', name: 'Antarctica Pilsen 300ml', price: '49', url_image: 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg' }
// ]

// const mockAxiosErr = api.generateToken.mockImplementation(() => Promise.reject(resultRejected))

api.getAllProducts.mockImplementation(() => Promise.resolve([]));

describe('Testa a página de login', () => {

  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };

  it('Verifica se possue os elementos descritos no protótipo', async () => {
    renderWithRouter(<App />);
    expect(await screen.findByText('Email')).toBeInTheDocument();
    expect(await screen.findByText('Senha')).toBeInTheDocument();
    expect(await screen.findByText('Entrar')).toBeInTheDocument();
    expect(await screen.findByText('Ainda não tenho conta')).toBeInTheDocument();
  });

  it('Verifica se retorna mensagem caso usuário não esteja cadastrado', async () => {
    api.generateToken = jest.fn().mockResolvedValue(resultRejected);
    await act(async () => {
      renderWithRouter(<App />);
      const inputEmail = await screen.findByTestId('email-input');
      const inputSenha = await screen.findByTestId('password-input');
      const buttonEntrar = await screen.findByText('Entrar');
      expect(buttonEntrar).toBeDisabled();
      userEvent.type(inputEmail, 'test@test.com');
      userEvent.type(inputSenha, '414142');
      expect(buttonEntrar).not.toBeDisabled();
      fireEvent.click(buttonEntrar);
      expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
      ;
    })
  });

  it('Verifica se é possível logar após inserção de dados cadastrados', async () => {
    api.generateToken = jest.fn().mockResolvedValue(resultResolved);
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
  });
});
