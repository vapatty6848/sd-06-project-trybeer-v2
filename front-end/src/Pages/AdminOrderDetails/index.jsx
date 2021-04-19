import React, { useContext } from 'react';

import { GlobalContext } from '../../Contexts/GlobalContext';

import MenuTopAdmin from '../../Components/MenuTopAdmin';
import SideBarAdmin from '../../Components/SideBarAdmin';
import CardAdminDetails from '../../Components/CardAdminDetails';

import S from './styles';

const AdminOrderDetails = () => {
  const { stateSideBarAdmin } = useContext(GlobalContext);

  return (
    <S.Container>

      <MenuTopAdmin dataTestid="top-title" title="Meu perfil" />

      <S.Context>

        <SideBarAdmin />

        <S.ContainerCard stateSideBarAdmin={ stateSideBarAdmin }>

          <CardAdminDetails />

        </S.ContainerCard>

      </S.Context>

    </S.Container>
  );
};

export default AdminOrderDetails;
