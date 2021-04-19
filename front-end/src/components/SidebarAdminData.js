import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';

const SidebarAdminData = [
  {
    label: 'Pedidos',
    path: '/admin/orders',
    icon: <FaIcons.FaCartPlus />,
    id: 'side-menu-item-orders',
  },
  {
    label: 'Meu Perfil',
    path: '/admin/profile',
    icon: <ImIcons.ImProfile />,
    id: 'side-menu-item-profile',
  },
];

export default SidebarAdminData;
