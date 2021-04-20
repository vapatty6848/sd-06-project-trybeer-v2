import React from 'react';
import Form from '../components/client/Form';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const ProfileClient = () => (
  <PaperContainer>
    <p className="hidden" data-testid="top-title">Meu perfil</p>
    <p>Profile Client</p>
    <Form />
  </PaperContainer>
);

export default ProfileClient;
