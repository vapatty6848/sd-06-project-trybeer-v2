import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import MenuSideBar from '../components/menuAdmin/MenuSideBar';
import RenderOrder from '../components/AdminOrderDetail/RenderOrder';

function AdminOrderDetails({ match, history }) {
  const [productDetail, setProductDetail] = useState([]);
  const [status, setStatus] = useState('');
  const [change, setChange] = useState(false);
  const { params: { id } } = match;

  useEffect(() => {
    const fetchProductDetails = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const { token } = user;
      const response = await api.getOrdersById(token, id);
      if (response.message) history.push('/login');
      response.map((item) => setStatus(item.productStatus));
      setProductDetail(response);
    };
    fetchProductDetails();
  }, [history, id]);

  const handleClick = () => {
    setStatus('Entregue');
    setChange(true);
  };

  useEffect(() => {
    const fetchStatusOrder = async () => {
      await api.updateStatusOrder(status, id);
      if (status === 'Entregue') setChange(true);
    };
    fetchStatusOrder();
  });

  return (
    <div>
      <MenuSideBar />
      <span data-testid="order-number">
        {`Pedido ${id} - `}
      </span>
      <span
        data-testid="order-status"
      >
        { status }
      </span>
      <RenderOrder productDetail={ productDetail } />
      <button
        type="button"
        hidden={ change }
        onClick={ handleClick }
        data-testid="mark-as-delivered-btn"
      >
        Marcar como entregue
      </button>
    </div>
  );
}

AdminOrderDetails.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default AdminOrderDetails;
