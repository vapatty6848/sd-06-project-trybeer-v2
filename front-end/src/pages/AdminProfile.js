import React, { useContext } from 'react';

import AppContext from '../context/app.context';
import { Topbar } from '../components';

export default function AdminProfile() {
  const { tokenContext: { token } } = useContext(AppContext);

  return (
    <section>
      <Topbar title="Perfil" />
      <section data-testid="profile-name">{ `Nome: ${token.name}` }</section>
      <section data-testid="profile-email">{ `Email: ${token.email}` }</section>
    </section>
  );
}
