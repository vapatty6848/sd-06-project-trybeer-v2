import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCardAdm from './ProductCardAdm';
import currencyFormat from '../utils/currencyFormat';
import updateStatus from '../methods/updateStatus';

function OrderDetailsCard({ orderDetails }) {
  const [productADM, setProductADM] = useState(orderDetails[0]);

  useEffect(() => {

    switch (orderDetails[0].status) {
      case 'Pendente':
        orderDetails[0].status = "Preparando"
        break;
      case 'Preparando':
        orderDetails[0].status = "Entregue"
        break;
      case 'Entregue':
        break;
      default:
        console.log(`Error`);
    }
  }, [productADM]);

  let visible = true;



  if (orderDetails[0]) {
    return (

      <div>
        <div>
          <span data-testid="order-number">{`Pedido ${orderDetails[0].saleId}`}</span>
          <span data-testid="order-status">{` - ${orderDetails[0].status}`}</span>
        </div>
        <div>
          {orderDetails.map(
            (product) => (<ProductCardAdm
              product={product}
              key={product.name}
            />),
          )}
          <p data-testid="order-total-value">
            total do pedido:
            {' '}
            {currencyFormat(Number(orderDetails[0].totalPrice))}
            {' '}
          </p>
          <hr />
        </div>
        { visible
          && (
            <div>
              <button
                // data-testid="mark-as-prepared-btn"
                type="button"
                onClick={async () => {
                  return setProductADM(await updateStatus(orderDetails[0]))
                }}
              >
                Marcar como entregue
          </button>
              <button
                data-testid="mark-as-prepared-btn"
                type="button"
                onClick={async (e) => {
                  console.log(e.currentTarget)
                  // return setProductADM(await updateStatus(orderDetails[0]))
                }}
              >
                Preparar pedido
          </button>
            </div>

          )}
      </div>);
  }
  return <p>...loading </p>;
}

OrderDetailsCard.propTypes = {
  orderDetails: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default OrderDetailsCard;
