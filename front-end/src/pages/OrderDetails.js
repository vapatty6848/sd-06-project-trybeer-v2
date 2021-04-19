import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import TrybeerContext from '../context/TrybeerContext';
import formatedDate from '../utils/formatedDate';
import formatedPrice from '../utils/formatedPrice';

function OrderDetails(props) {
  const { user } = useContext(TrybeerContext);
  const [orderCart, setOrderCart] = useState([]);
  const [hasState, setHasState] = useState(false);
  const { location: { state }, history } = props;

  const fetchOrderDetails = async () => {
    if (state) {
      const order = await verifyToken(`orders/details/${state.id}`, user, history);
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

  useEffect(() => {
    observeState();
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {
        hasState && (
          <div>
            <TopMenu titleMenu="Detalhes de Pedido" />
            <div className="content-panel">
              <div>
                {
                  orderCart.map(({ quantity, name, price }, index) => (
                    <div
                      key={ index }
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
                        data-testid={ `${index}-order-total-value` }
                      >
                        {`Valor Unitário: ${formatedPrice(price)}` }
                      </div>
                      <div
                        className="card-total"
                        data-testid={ `${index}-product-total-value` }
                      >
                        {`Valor Total: ${formatedPrice((price * quantity).toFixed(2))}` }
                      </div>
                    </div>
                  ))
                }
              </div>
              <div data-testid="order-number">
                { `Pedido ${state.id}` }
              </div>
              <div data-testid="order-date">
                { formatedDate(state.saleDate) }
              </div>
              <div data-testid="order-total-value">
                { formatedPrice(state.totalPrice) }
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
      totalPrice: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default OrderDetails;
