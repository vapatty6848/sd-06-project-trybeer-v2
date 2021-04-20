import React from 'react';
import PropTypes from 'prop-types';

const OrdersDetailsCard = ({ order, id }) => {
  const handleDate = (dateTime) => {
    const date = new Date(dateTime);
    const twoNumber = -2;
    const day = (`0${date.getDate()}`).slice(twoNumber);
    const month = (`0${(date.getMonth() + 1)}`).slice(twoNumber);
    const formatDate = `${day}/${month}`;
    return formatDate;
  };

  const handleTotalValue = (price, quantity) => {
    console.log('price, quantity', price, quantity)
    const totalValue = price * quantity;
    const formatValue = totalValue.toFixed(2).replace('.', ',');
    return formatValue;
  };

  return (
    <div>
      <div className="top-details">
        <div
          data-testid="order-number"
        >
          {`Pedido ${id}`}
        </div>
        <div
          data-testid="order-date"
        >
          { order[0] ? handleDate(order[0].saleDate) : true }
        </div>
      </div>
      <div>
        { order ? order.map(({ productQuantity, productName, productPrice }, index) => (
          <div
            className="top-data"
            key={ index }
          >
            <div
              data-testid={ `${index}-product-qtd` }
            >
              { productQuantity }
            </div>
            <div
              data-testid={ `${index}-product-name` }
            >
              { productName }
            </div>
            <div
              data-testid={ `${index}-product-total-value` }
            >
              { `R$ ${handleTotalValue(productPrice, productQuantity)} ` }
            </div>
          </div>
        ))
          : true }
        <div className="flex-end">
          <div
            data-testid="order-total-value"
          >
            { order[0]
              ? `Total: R$ ${order[0].totalPrice.replace('.', ',')}`
              : true }
          </div>
        </div>
      </div>
    </div>
  );
};

OrdersDetailsCard.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default OrdersDetailsCard;
