import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MenuAdmin from '../components/MenuAdmin';
import CartItem from '../components/CartItem';
import { getSaleByID, updateOrderById } from '../services/salesServices';
import Button from '../components/Button';

function OrderDetails({ match }) {
  const [orders, setOrders] = useState([]);
  const [orderDone, setOrderDone] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  const { id } = match.params;

  const getOrders = async () => {
    const result = await getSaleByID(id);
    setOrders(result);
    setOrderStatus(result[0].Status);
    setTotalValue(result[0].total.replace('.', ','));
    if (result[0].Status !== 'Entregue') {
      setOrderDone(false);
    } else {
      setOrderDone(true);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleClick = async () => {
    setOrderDone(true);
    setOrderStatus('Entregue');
    await updateOrderById(id);
  };

  return (
    <div>
      <MenuAdmin />
      <div className="order-details-card-admin-2">
        <div className="order-details-title">
          <p className="order-number" data-testid="order-number">{ `Pedido ${id} -` }</p>
          <p
            data-testid="order-status"
            className={ `order-number ${orderStatus === 'Entregue' ? 'order-done' : 'order-notdone'}` }
          >
            { orderStatus }
          </p>
        </div>
        { orders.map((order, index) => (
          <CartItem
            key={ index }
            index={ index }
            quantity={ order.quantidade }
            name={ order.product }
            price={ order.price }
            unitPriceID="order-unit-price"
            qtdID="product-qtd"
            removeButton={ false }
          />)) }
        <p className="total-checkout" data-testid="order-total-value">{`Total: R$ ${totalValue}`}</p>
        {!orderDone && (
          <Button
            className="btn btn-success"
            title="Marcar como entregue"
            dataTestid="mark-as-delivered-btn"
            handleClick={ handleClick }
            btnDisabled={ false }
          />
        )}
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default OrderDetails;
