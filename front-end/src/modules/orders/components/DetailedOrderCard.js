import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../../axios';
import { update } from '../../../utils';

function DetailedOrderCard(props) {
  const [order, setOrder] = useState();
  const [saleStatus, setSaleStatus] = useState(false);
  const { match: { params: { id } } } = props;

  // Get Sales
  useEffect(() => {
    api.get(`/sales/${id}`).then((resp) => setOrder(resp.data));
  }, [saleStatus]);

  let date = '';
  let orderStatus = '';
  if (order && order.createdAt) {
    const { status, createdAt } = order;
    // date = new Date(createdAt).toLocaleDateString();
    // date = date.split('/');
    // date = `${date[0]}/${date[1]}`;

    date = createdAt;
    date = date.split('T');
    date = date[0].split('-');
    date = `${date[2]}/${date[1]}`;
    orderStatus = status;
  }

  const handleClick = () => {
    update(`/sales/${id}`).then((resp) => setSaleStatus(resp.message));
  };

  const renderButton = () => {
    const button = (
      <button
        type="button"
        data-testid="mark-as-delivered-btn"
        onClick={ () => handleClick() }
      >
        Marcar como entregue
      </button>
    );

    if (orderStatus === 'pending') return button;
  };

  return (
    <div className="flex flex-col">
      <p
        className="flex items-center space-x-2"
        data-testid="order-number"
        to={ `/orders/${id}` }
      >
        <span className="hidden">{ `Pedido ${id}` }</span>
        <span>{ `Order N. ${id}` }</span>
      </p>
      <p
        className="flex items-center space-x-2"
        data-testid="order-date"
      >
        Order date:
        { date }
      </p>
      <p
        className="flex items-center space-x-2"
        data-testid="order-total-value"
      >
        Total:
        { order ? `R$ ${order.totalPrice.toString().replace('.', ',')}` : '' }
      </p>
      <p data-testid="order-status">
        { orderStatus === 'pending' ? 'Pendente' : 'Entregue' }
      </p>
      {
        renderButton()
      }
      { order && order.products.map((product, index) => (
        <div
          key={ index }
          className="border rounded-md border-primary p-2 flex flex-col items-center"
        >
          <div className="w-50 h-50 border-gray-200 border p-2">
            <img
              src={ product.urlImage }
              className="round-md object-contain
                w-80 h-80 md:w-48 md:h-48 md:object-scale-down"
              alt={ product.name }
            />
          </div>
          <div className="flex flex-col">
            <p data-testid={ `${index}-order-unit-price` }>
              <strong>{ `(R$ ${product.price.replace('.', ',')})` }</strong>
            </p>
            <p data-testid={ `${index}-product-name` }>
              { product.name }
            </p>
            <p data-testid={ `${index}-product-qtd` }>
              { product.quantity }
            </p>
            <p data-testid={ `${index}-product-total-value` }>
              { `R$ ${(product.price * product.quantity).toFixed(2).replace('.', ',')}` }
            </p>
          </div>

        </div>
      ))}
    </div>
  );
}

DetailedOrderCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(DetailedOrderCard);
