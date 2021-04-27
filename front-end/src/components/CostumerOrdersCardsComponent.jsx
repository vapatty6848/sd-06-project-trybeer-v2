import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../service/formatPrice';
import statusConvert from '../service/statusConvert';
import '../style/OrderCards.css';
import statusConvertCss from '../service/statusConvertCss';

function CostumerOrdersCardsComponent({ element, index }) {
  const { id, totalPrice, saleDate, status } = element;

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
          { `R$ ${formatPrice(totalPrice)}` }
        </h4>
        <p
          className={ statusConvertCss(statusConvert(status)) }
        >
          { statusConvert(status) }
        </p>
      </div>
    </div>
  );
}

CostumerOrdersCardsComponent.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.shape({
    replace: PropTypes.func,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
};

export default CostumerOrdersCardsComponent;
