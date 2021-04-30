import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import { put } from '../api/fetchFunctions';
import './OrderDetails.scss';

function AdminOrderDetails(props) {
  const { user } = useContext(TrybeerContext);
  const [orderCart, setOrderCart] = useState([]);
  const [hasState, setHasState] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const { location: { state }, history } = props;

  const checkStatus = (status) => {
    if (status === 'Entregue') return setIsShowing(false);
  };

  const fetchOrderDetails = useCallback(async () => {
    if (state) {
      const order = await verifyToken(`admin/orders/details/${state.id}`, user, history);
      checkStatus(order.status);
      setOrderCart([order]);
    }
  }, [user, history, state]);

  const observeState = useCallback(() => {
    if (!state) {
      history.push('/login');
    } else {
      setHasState(true);
    }
  }, [history, state]);

  useEffect(() => {
    observeState();
    fetchOrderDetails();
  }, [fetchOrderDetails, observeState]);

  const markAsPreparing = async (status) => {
    await put(`admin/orders/${state.id}`, user.token, { status });
    fetchOrderDetails();
  };

  const markAsDone = async (status) => {
    await markAsPreparing(status);
    setIsShowing(false);
  };

  return (
    <div>
      <TopMenu />
      {
        hasState && (
          <div>
            <TopMenu titleMenu="Detalhes de Pedido" />
            <div className="content-panel-detail">
              <div>
                {
                  orderCart[0] && (
                    <div className="order-description">
                        {`Pedido ${orderCart[0].saleId} - ${orderCart[0].status}` }
                      <div
                        className="order-total"
                        data-testid="order-total-value"
                      >
                        { `Valor Total: ${formatedPrice(orderCart[0].totalPrice)}` }
                      </div>
                    </div>
                  )
                }
                {
                  orderCart[0] && orderCart[0].products.map(({
                    quantity,
                    name,
                    price,
                    id,
                  }, index) => (
                    <div
                      key={ id }
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
                        data-testid={ `${index}-order-unit-price` }
                      >
                        {`Valor Unitário: (${formatedPrice(price)})` }
                      </div>
                      <div
                        className="card-total"
                        data-testid={ `${index}-product-total-value` }
                      >
                        { `${formatedPrice((price * quantity).toFixed(2))}` }
                      </div>
                    </div>
                  ))
                }
              </div>
              {
                  orderCart[0] && (
                    <div
                      className="order-total-value"
                      data-testid="order-total-value"
                    >
                      { `TOTAL: ${formatedPrice(orderCart[0].totalPrice)}` }
                    </div>
                  )
                }
              
            </div>
          </div>
        )
      }
      {
        isShowing && (
          <div>
            <button
              type="button"
              data-testid="mark-as-delivered-btn"
              className="btn"
              onClick={ () => markAsDone('Entregue') }
            >
              Marcar como entregue
            </button>
            <button
              type="button"
              className="btn"
              data-testid="mark-as-prepared-btn"
              onClick={ () => markAsPreparing('Preparando') }
            >
              Preparar pedido
            </button>
          </div>
        )
      }
    </div>
  );
}

AdminOrderDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default AdminOrderDetails;
