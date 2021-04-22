import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import api from '../services/api'
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import App from '../App';

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

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

describe('Testa a página de Checkout', () => {

  beforeEach(async () => {
    api.generateToken = jest.fn().mockResolvedValue(resultResolved);
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const inputEmail = await getByTestId('email-input');
    const inputSenha = await getByTestId('password-input');
    const buttonEntrar = await getByText('Entrar');
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

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Verifica se possue os elementos descritos no protótipo com um produto inserido no carrinho', async () => {
    api.registerSales.mockImplementation(() => Promise.resolve({ response: { id: 1 } }));
    expect(await screen.findByText('Produtos')).toBeInTheDocument();
    expect(await (await screen.findByTestId('0-product-qtd-input')).textContent).toBe('2');
    expect(await (await screen.findByTestId('0-product-name')).textContent).toBe('Skol Lata 250ml');
    expect(await (await screen.findByTestId('0-product-total-value')).textContent).toBe('R$ 4,40');
    expect(await screen.findByTestId('checkout-street-input')).toBeInTheDocument();
    expect(await screen.findByTestId('0-removal-button')).toBeInTheDocument();
    expect(await screen.findByTestId('order-total-value')).toBeInTheDocument();
    expect(await screen.findByTestId('checkout-house-number-input')).toBeInTheDocument();
    const inputRua = await screen.findByTestId('checkout-street-input');
    const inputNumero = await screen.findByTestId('checkout-house-number-input');
    userEvent.type(inputRua, 'rua nova');
    userEvent.type(inputNumero, '15');
    fireEvent.click(await screen.findByTestId('checkout-finish-btn'));
    const buttonPlus = await screen.findByTestId('0-product-plus');
    const btnViewCart = await screen.findByTestId('checkout-bottom-btn');
    fireEvent.click(buttonPlus);
    fireEvent.click(btnViewCart);
    // expect(await screen.findByText('Compra Realizad com Sucesso')).toBeInTheDocument();
    const btnItem = await screen.findByTestId('0-removal-button');
    fireEvent.click(btnItem);
    expect(await screen.findByText('Não há produtos no carrinho')).toBeInTheDocument();
  });
});
