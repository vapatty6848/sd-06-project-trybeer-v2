import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import api from '../services/api'
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Orders from '../pages/Orders';
import OrdersDetails from '../pages/OrdersDetails';

jest.mock('../services/api');

const userApi = {
  id: 2, name: "testuser",
  email: "user@test.com",
  role: "client",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoid…TEzfQ.8As_I2Uz1z0S8p4APwPDH5flGwifoEoOx9CJgcQGCV8"
}

const productsApi = [
  { id: '1', name: 'Skol Lata 250ml', price: '2.20', url_image: 'http://localhost:3001/images/Skol Lata 350ml.jpg' },
  { id: '2', name: 'Heineken 600ml', price: '50', url_image: 'http://localhost:3001/images/Heineken 600ml.jpg' },
  { id: '3', name: 'Antarctica Pilsen 300ml', price: '49', url_image: 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg' }
];

api.getAllProducts.mockImplementation(() => Promise.resolve(productsApi));
api.getAllOrdersByUser = jest.fn().mockResolvedValue([{ id: 1, saleDate: "2021-03-29 15:21:36", totalPrice: "4.40" }]);
api.getOrdersById = jest.fn().mockResolvedValue([
  {
    id: 1,
    saleDate: "2021-03-29 15:21:36",
    productName: 'Skol Lata 250ml',
    totalPrice: "4.40",
    productQuantity: 2,
    productPrice: 2.20,
  }]);

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

describe('Testa a página de Meus Pedidos', () => {
const history = createMemoryHistory();
  beforeEach(async () => {
    localStorage.cart = JSON.stringify([]);
    localStorage.user = JSON.stringify(userApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup()
  });

  it('Verifica se é possível renderizar a tela de meus pedidos do cliente', async () => {
    const { getByTestId } = renderWithRouter(<Orders history={ history } />);
    expect(await screen.findByText('Meus Pedidos')).toBeInTheDocument();
    expect(await (await screen.findByTestId('0-order-number')).textContent).toBe('Pedido 1');
    expect(await (await screen.findByTestId('0-order-date')).textContent).toBe('29/03');
    expect(await (await screen.findByTestId('0-order-total-value')).textContent).toBe('R$ 4,40 ');
    fireEvent.click(getByTestId('0-orders-details-link'));
  });

  it('Verifica se renderiza tela de detalhes do pedido', async () => {
    const match = { params: { id: '1' } };
    const { getByTestId, getByText} = renderWithRouter(<OrdersDetails  history={ history } match={match} />);
    expect(await screen.findByText('Detalhes de Pedido')).toBeInTheDocument();
    expect(await (await screen.findByTestId('order-number')).textContent).toBe('Pedido 1');
    expect(await (await screen.findByTestId('order-date')).textContent).toBe('29/03');
    expect(await (await screen.findByTestId('0-product-qtd')).textContent).toBe('2');
    expect(await (await screen.findByTestId('0-product-name')).textContent).toBe('Skol Lata 250ml');
    expect(await (await screen.findByTestId('0-product-total-value')).textContent).toBe('R$ 4,40 ');
    fireEvent.click(getByTestId('top-hamburguer'));
    fireEvent.click(getByText('Sair'));   
  });
});

