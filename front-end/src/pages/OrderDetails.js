import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import TrybeerContext from '../context/TrybeerContext';
import formatedDate from '../utils/formatedDate';
import formatedPrice from '../utils/formatedPrice';
import './OrderDetails.scss';

function OrderDetails(props) {
  const { user } = useContext(TrybeerContext);
  const [orderCart, setOrderCart] = useState([]);
  const [hasState, setHasState] = useState(false);
  const { location: { state }, history } = props;

  const observeState = useCallback(() => {
    if (!state) {
      history.push('/login');
    } else {
      setHasState(true);
    }
  }, [state, history]);

  const fetchOrderDetails = useCallback(async () => {
    if (state) {
      const order = await verifyToken(`orders/details/${state.id}`, user, history);
      setOrderCart(order);
    }
  }, [state, user, history]);

  useEffect(() => {
    observeState();
    fetchOrderDetails();
  }, [observeState, fetchOrderDetails]);

  return (
    <div>
      {
        hasState && (
          <div>
            <TopMenu titleMenu="Detalhes de Pedido" />
            <div className="content-panel-detail">
              <div
                data-testid="order-number"
                className="order-description"
              >
                  { state && `Pedido ${state.id} - ${state.status} - ${formatedDate(state.saleDate)}` }
              </div>
              <div>
                {
                  orderCart.map(({ quantity, name, price }, index) => (
                    <div
                      key={ index }
                      className="order-card-container-detail"
                      data-testid={ `${index}-order-card-container` }
                    >

                      <div data-testid={ `${index}-product-name` }>
                        {`${name}` }
                      </div>
                      <div data-testid={ `${index}-product-qtd` }>
                        {`Qtd: ${quantity}` }
                      </div>
                      <div
                        data-testid={ `${index}-order-total-value` }
                      >
                        {`Valor Unitário: ${formatedPrice(price)}` }
                      </div>
                      <div
                        className="card-total"
                        data-testid={ `${index}-product-total-value` }
                      >
                        {`Valor: ${formatedPrice((price * quantity).toFixed(2))}` }
                      </div>
                    </div>
                  ))
                }
              </div>
              <div data-testid="order-total-value" className="order-total-value">
                TOTAL: { state && formatedPrice(state.totalPrice) }
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

OrderDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      saleDate: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default OrderDetails;
