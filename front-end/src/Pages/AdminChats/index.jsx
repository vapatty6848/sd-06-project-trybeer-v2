import React, { useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';

import MenuTopAdmin from '../../Components/MenuTopAdmin';
import SideBarAdmin from '../../Components/SideBarAdmin';
import CardAdminChats from '../../Components/CardAdminChats';
import S from '../AdminOrderDetails/styles';

export default function AdminChats() {
  const { stateSideBarAdmin } = useContext(GlobalContext);

  return (
    <S.Container>

      <MenuTopAdmin dataTestid="top-title" title="Meu perfil" />

      <S.Context>

        <SideBarAdmin />

        <S.ContainerCard stateSideBarAdmin={ stateSideBarAdmin }>

          <CardAdminChats />

        </S.ContainerCard>

      </S.Context>

    </S.Container>
  );
}
