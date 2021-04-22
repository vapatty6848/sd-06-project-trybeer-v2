import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';
import MenuSideBarAdm from '../components/menuAdmin/MenuSideBarAdm';
import RenderOrder from '../components/AdminOrderDetail/RenderOrder';

function AdminOrderDetails({ match }) {
  const [productDetail, setProductDetail] = useState([]);
  const [status, setStatus] = useState('');
  const [change, setChange] = useState(true);
  const [prepar, setPrepar] = useState(true);
  const history = useHistory();
  const { params: { id } } = match;

  useEffect(() => {
    const fetchProductDetails = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const { token } = user;
      api.getOrdersById(token, id).then((response) => {
        if (response.message) history.push('/login');
        response.map((item) => setStatus(item.productStatus));
        setProductDetail(response);
        setStatus(response[0].status);
        if (response[0].status !== 'Entregue') setChange(false);
        if (response[0].status !== 'Preparando') setPrepar(false);
      });
    };
    fetchProductDetails();
  }, [history, id]);

  const fetchStatusOrder = async (sts) => {
    await api.updateStatusOrder(sts, id);
  };

  const handleClick = () => {
    setChange(true);
    setStatus('Entregue');
    fetchStatusOrder('Entregue');
  };

  const handlePrepar = () => {
    setPrepar(true);
    setStatus('Preparando');
    fetchStatusOrder('Preparando');
  };

  return (
    <div>
      <MenuSideBarAdm />
      <span data-testid="order-number">
        {`Pedido ${id} - `}
      </span>
      <span
        data-testid="order-status"
      >
        { status }
      </span>
      <RenderOrder productDetail={ productDetail[0] } />
      <button
        type="button"
        hidden={ prepar }
        onClick={ handlePrepar }
        data-testid="mark-as-prepared-btn"
      >
        Preparar pedido
      </button>
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
};

export default AdminOrderDetails;
