import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCardAdm from './ProductCardAdm';
import currencyFormat from '../utils/currencyFormat';
import updateStatus from '../methods/updateStatus';

function OrderDetailsCard({ orderDetails }) {
  const [productADM, setProductADM] = useState(orderDetails);
  const [deliveryBTN, setDeliveryBTN] = useState(false)
  const [preparingBTN, setPreparingBTN] = useState(false)

  useEffect(() => {
    if (productADM && productADM[0].status === 'Entregue') {
      setDeliveryBTN(true)
      setPreparingBTN(true)
    }
    if (productADM && productADM[0].status === 'Preparando') {
      setPreparingBTN(true)
    }
  }, [productADM]);

  if (productADM[0]) {
    return (
      <div>
        <div>
          <span data-testid="order-number">{`Pedido ${productADM[0].saleId}`}</span>
          <span data-testid="order-status">{` - ${productADM[0].status}`}</span>
        </div>
        <div>
          {productADM.map(
            (product, index) => (<ProductCardAdm
              product={product}
              index={index}
              key={product.name}
            />),
          )}
          <p data-testid="order-total-value">
            total do pedido:
            {' '}
            {currencyFormat(Number(productADM[0].totalPrice))}
            {' '}
          </p>
          <hr />
        </div>
        <div>
          <button
            data-testid="mark-as-delivery-btn"
            value="Entregue"
            disabled={deliveryBTN}
            type="button"
            onClick={async (e) => {
              return setProductADM(await updateStatus(productADM[0], e.target.value))
            }}
          >
            Marcar como entregue
          </button>
          <button
            data-testid="mark-as-prepared-btn"
            type="button"
            value="Preparando"
            disabled={preparingBTN}
            onClick={async (e) => {
              return setProductADM(await updateStatus(productADM[0], e.target.value))
            }}
          >
            Preparar pedido
          </button>
          <Link to="/admin/orders" >Voltar</Link>
        </div>

      </div>);
  }
  return <p>...loading </p>;
}

OrderDetailsCard.propTypes = {
  orderDetails: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default OrderDetailsCard;
