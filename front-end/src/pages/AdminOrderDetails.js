import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import { put } from '../api/fetchFunctions';

function AdminOrderDetails(props) {
  const { user } = useContext(TrybeerContext);
  const [orderCart, setOrderCart] = useState([]);
  const [hasState, setHasState] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const { location: { state }, history } = props;
  const fetchOrderDetails = async () => {
    if (state) {
      const order = await verifyToken(`admin/orders/details/${state.id}`, user, history);
      setOrderCart(order);
    }
  };

  const observeState = () => {
    if (!state) {
      history.push('/login');
    } else {
      setHasState(true);
    }
  };

  const markAsDone = async () => {
    await put(`admin/orders/${state.id}`, user.token, { status: 'Entregue' });
    fetchOrderDetails();
    setIsShowing(false);
  };

  useEffect(() => {
    observeState();
    fetchOrderDetails();
  }, []);

  return (
    <div>
      <TopMenu />
      {
        hasState && (
          <div>
            <div className="content-panel">
              <div>
                {
                  orderCart[0] && (
                    <div>
                      <div data-testid="order-status">
                        {`Status: ${orderCart[0].status}` }
                      </div>
                      <div data-testid="order-number">
                        {`Pedido ${orderCart[0].sale_id}` }
                      </div>
                    </div>
                  )
                }
                {
                  orderCart.map(({
                    quantity,
                    name,
                    price,
                    sale_id: saleId,
                    total_price: totalPrice,
                  }, index) => (
                    <div
                      key={ saleId }
                      className="order-card-container"
                      data-testid={ `${index}-order-card-container` }
                    >
                      <div data-testid={ `${index}-product-name` }>
                        {`Nome: ${name}` }
                      </div>
                      <div data-testid={ `${index}-product-qtd` }>
                        {`Quantidade: ${quantity}` }
                      </div>
                      <div
                        className="card-total"
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
                      <div
                        className="card-total"
                        data-testid="order-total-value"
                      >
                        { `Valor Total: ${formatedPrice(totalPrice)}` }
                      </div>
                    </div>
                  ))
                }
              </div>
              <div data-testid="order-status">
                {/* { status } */}
              </div>
              <div data-testid="order-total-value">
                {/* { formatedPrice(totalPrice) } */}
              </div>
            </div>
          </div>
        )
      }
      {
        isShowing && (
          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            onClick={ markAsDone }
          >
            Marcar como entregue
          </button>
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
