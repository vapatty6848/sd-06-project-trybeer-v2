import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarAdmin from '../../../design-components/SideBarAdmin';
import Loader from '../../../design-components/Loader';
import DetailAdminCard from './components/DetailAdminCard';
import ButtonDelivered from './components/ButtonDelivered';

const styling = 'text-sm md:text-base lg:text-lg text-green-500';

function AdminOrderDetail() {
  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState({});
  const [status, setStatus] = useState('');

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/sales/${id}`)
      .then((response) => {
        console.log(response.data);
        setSale(response.data);
        setStatus(response.data.status);
        console.log(status)
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const handleClick = (sendStatus) => {
    axios.put(`http://localhost:3001/sales/${id}`, {
      status: sendStatus
    })
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    loading ? <Loader /> : (
      <div>
        <SideBarAdmin />
        <DetailAdminCard sale={ sale } status={ status } />
        <div
          className="flex justify-center"
        >
          {(status === 'Entregue')
            ? <span className={ styling }>Pedido Entregue!</span>
            : <div>
              <ButtonDelivered testid="mark-as-prepared-btn" handleClick={()=> handleClick('Preparando') }>Preparar pedido</ButtonDelivered>
              <ButtonDelivered testid="mark-as-delivered-btn" handleClick={()=> handleClick('Entregue') }>Marcar como entregue</ButtonDelivered>
              </div>
          }
        </div>
      </div>
    )
  );
}

export default AdminOrderDetail;
