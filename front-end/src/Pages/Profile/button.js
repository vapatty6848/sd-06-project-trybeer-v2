import React from 'react';

import Button from '../../Components/Button';

export default function button(isDisabled) {
  return (
    <Button
      type="submit"
      heigth="40px"
      color="green"
      fontSize="20px"
      disabled={ isDisabled }
      dataTestid="profile-save-btn"
    >
      Salvar
    </Button>
  );
}
