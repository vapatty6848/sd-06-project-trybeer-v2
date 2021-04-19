import React from 'react';
import PropTypes from 'prop-types';
import '../style/OrderCards.css';

function CostumerOrdersCardsComponent({ element, index }) {
  const { id, total_price: totalPrice, sale_date: saleDate } = element;

  const parseDate = () => {
    const dateAsString = new Date(saleDate);
    const dateOk = dateAsString.toLocaleDateString('pt-BR');
    const five = 5;
    const justMonthAndYear = dateOk.substring(0, five);
    return justMonthAndYear;
  };

  return (
    <div className="orderCards">
      <div className="orderCards_title">
        <h4 data-testid={ `${index}-order-number` }>
          {`Pedido ${id}`}
        </h4>
        <p data-testid={ `${index}-order-date` }>
          { parseDate() }
        </p>
      </div>
      <div className="orderCards_price">
        <h4 data-testid={ `${index}-order-total-value` }>
          { `R$ ${totalPrice.replace('.', ',')}` }
        </h4>
      </div>
    </div>
  );
}

CostumerOrdersCardsComponent.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.shape({
    replace: PropTypes.func,
    id: PropTypes.number,
    sale_date: PropTypes.string,
    total_price: PropTypes.number,
  }).isRequired,
};

export default CostumerOrdersCardsComponent;
