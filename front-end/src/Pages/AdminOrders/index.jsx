import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GlobalContext } from '../../Contexts/GlobalContext';
import { getAllAdminOrders } from '../../Services/Apis';

import MenuTopAdmin from '../../Components/MenuTopAdmin';
import SideBarAdmin from '../../Components/SideBarAdmin';
import CardAdminDetails from '../../Components/CardAdminStatus';

import S from './styles';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const { stateSideBarAdmin } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));

    if (!userToken) history.push('/login');
  }, [history]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      const fetchData = await getAllAdminOrders();
      setOrders(fetchData);
    };
    fetchMyOrders();
  }, []);

  return (
    <S.Container>

      <MenuTopAdmin dataTestid="top-title" title="Meu perfil" />

      <S.Context>

        <SideBarAdmin />

        <S.ContainerCard stateSideBarAdmin={ stateSideBarAdmin }>
          {orders && orders.map((order, index) => (
            <CardAdminDetails
              key={ order.id }
              index={ index }
              { ...order }
            />
          ))}
        </S.ContainerCard>

      </S.Context>
    </S.Container>
  );
};

export default AdminOrders;
