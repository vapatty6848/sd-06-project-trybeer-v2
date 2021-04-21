import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../service/formatPrice';
import '../style/OrdersDetailsAdmin.css';

function AdminDetailsOrdersCardsComponent({ element, index }) {
  const { productPrice, quantity, name, price } = element;
  return (
    <div className="admin_orders_details_list">
      <table>
        <tbody>
          <td data-testid={ `${index}-product-qtd` }>{ quantity }</td>
          <td data-testid={ `${index}-product-name` }>{ name }</td>
          <td data-testid={ `${index}-product-total-value` }>
            { `R$ ${formatPrice(productPrice)}` }
          </td>
          <td data-testid={ `${index}-order-unit-price` }>
            { `(R$ ${formatPrice(price)})` }
          </td>
        </tbody>
      </table>
    </div>
  );
}

AdminDetailsOrdersCardsComponent.propTypes = {
  element: PropTypes.shape({
    quantity: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    productPrice: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default AdminDetailsOrdersCardsComponent;
