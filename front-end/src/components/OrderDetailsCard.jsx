import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import currencyFormat from '../utils/currencyFormat';
import convertData from '../utils/convertData';

function OrderDetailsCard({orderDetails}) {
  console.log(orderDetails);

  if (orderDetails !== {}) {
    return (

      <div>
        <p data-testid="order-number">

          {`Pedido ${orderDetails.id}`}
        </p>
        <p data-testid="order-date">
          data do pedido:
          {convertData(orderDetails.saleDate)}
        </p>
        {/* {orderDetails.map(
          (product) => {
           
          
          return 
          ,
        )} */}

        <ProductCard product={ orderDetails }  />

        <p data-testid="order-total-value">
          total do pedido:
          {' '}
          {currencyFormat(Number(orderDetails.saleTotal))}
          {' '}
        </p>
        <hr />
      </div>);
  }
  return <p>...loading </p>;
}

OrderDetailsCard.propTypes = {
  orderDetails: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default OrderDetailsCard;
