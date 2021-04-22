import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import api from '../front-end/src/services/api'
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../front-end/src/App';
import Products from '../front-end/src/pages/Products';

jest.mock('../services/api');

const userApi = {
  id: 2, name: "testuser",
  email: "user@test.com",
  role: "client",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoid…TEzfQ.8As_I2Uz1z0S8p4APwPDH5flGwifoEoOx9CJgcQGCV8"
}

const resultResolved = { response: userApi, result: true }

const productsApi = [
  { id: '1', name: 'Skol Lata 250ml', price: '2.20', url_image: 'http://localhost:3001/images/Skol Lata 350ml.jpg' },
  { id: '2', name: 'Heineken 600ml', price: '50', url_image: 'http://localhost:3001/images/Heineken 600ml.jpg' },
  { id: '3', name: 'Antarctica Pilsen 300ml', price: '49', url_image: 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg' }
];

api.getAllProducts.mockImplementation(() => Promise.resolve(productsApi));

beforeEach(() => {
  localStorage.cart = JSON.stringify([]);
  localStorage.user = JSON.stringify(userApi);
});

describe('Testa a página de Produtos', () => {
 const history = createMemoryHistory();

  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };

  it('Verifica se possue os elementos descritos no protótipo', async () => {
    const { getByTestId } = renderWithRouter(<Products history={ history } />);
    expect(await screen.findByText('Skol Lata 250ml')).toBeInTheDocument();
    expect(getByTestId('0-product-price').textContent).toBe('R$ 2,20');
    expect(getByTestId('0-product-plus')).toBeInTheDocument();
    expect(getByTestId('0-product-minus')).toBeInTheDocument();
    const btnViewCart = getByTestId('checkout-bottom-btn');
    expect(btnViewCart.textContent).toBe('Ver Carrinho');
    expect(getByTestId('checkout-bottom-btn-value').textContent).toBe('R$ 0,00');
  });

  it('Verifica se é possível aumentar e diminuir a quantidade de um produto', async () => {
    api.getAllProducts.mockImplementation(() => Promise.resolve(productsApi));
    await act(async () => {
      const { getByTestId } = renderWithRouter(<Products history={ history } />);
      expect(await screen.findByText('Skol Lata 250ml')).toBeInTheDocument();
      const buttonPlus = await screen.findByTestId('0-product-plus');
      const buttonMinus = await screen.findByTestId('0-product-minus');
      fireEvent.click(buttonPlus);
      fireEvent.click(buttonPlus);
      expect(getByTestId('0-product-qtd').textContent).toBe('2')
      expect(await getByTestId('checkout-bottom-btn-value').textContent).toBe('R$ 4,40');
      fireEvent.click(buttonMinus);
      expect(getByTestId('0-product-qtd').textContent).toBe('1')
      expect(await getByTestId('checkout-bottom-btn-value').textContent).toBe('R$ 2,20');
    });
  });

  it('Verifica se ao adicioanar um item e clicar em ver carrinho redireciona à tela de checkout', async () => {
    api.generateToken = jest.fn().mockResolvedValue(resultResolved);
    const { getByTestId } = renderWithRouter(<App />);
    const inputEmail = await screen.findByTestId('email-input');
    const inputSenha = await screen.findByTestId('password-input');
    const buttonEntrar = await screen.findByText('Entrar');
    userEvent.type(inputEmail, 'user@test.com');
    userEvent.type(inputSenha, '414141');
    fireEvent.click(buttonEntrar);
    expect(await screen.findByText('Skol Lata 250ml')).toBeInTheDocument();
    const buttonPlus = await screen.findByTestId('0-product-plus');
    const btnViewCart = getByTestId('checkout-bottom-btn');
    fireEvent.click(buttonPlus);
    fireEvent.click(buttonPlus);
    expect(await getByTestId('checkout-bottom-btn-value').textContent).toBe('R$ 4,40');
    fireEvent.click(btnViewCart);
    expect(await (await screen.findByTestId('top-title')).textContent).toBe('Finalizar Pedido');
  });
});
